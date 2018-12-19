using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Schemas.Exceptions;
using backend.Schemas.Inputs;
using backend_datamodel.Models;
using backend_datamodel.Models.Crosstables;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoreLinq.Extensions;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<User> Register(RegisterData data);
        Task<bool> IsEmailInDb(string email);       
         Task<User> RegisterAnonymously(string email);
        Task<User> Login(LoginData data);
        Task<User> GetUserByToken(string token);
        Task AddToWishlist(int userId, int productId);
        Task RemoveFromWishlist(int userId, int productId);
        /// <summary>
        /// Changes the password of a given user
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="currentPassword">The current set password for the given user</param>
        /// <param name="newPassword">The desired password for the given user</param>
        /// <returns></returns>
        Task ChangePassword(int userId, string currentPassword, string newPassword);
        Task ChangeEmail(int userId, string newEmail);
        Task ChangeName(int userId, string newFirstName, string newLastName);
        Task<User> ChangeBirthDate(int userId, DateTime newBirthDate);
        /// <summary>
        /// Merges the local and online stored wishlists for an user that logs in
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="localProductIds">The stored wishlist product ids on the given machine</param>
        /// <returns></returns>
        Task MergeWishlist(int userId, List<int> localProductIds);
    }

    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _db;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAppEnv _appEnv;
        private readonly IEmailService _emailService;
        private const string LoginFailErrorMessage = "A user with that email/password combination does not exist.";
        private const string CreateAccountErrorMessage = "A user with that email address already exists.";
        
        public AccountService(DatabaseContext db, IPasswordHasher<User> passwordHasher, IAppEnv appEnv,
            IEmailService emailService)
        {
            _db = db;
            _passwordHasher = passwordHasher;
            _appEnv = appEnv;
            _emailService = emailService;
        }
        public async Task<bool> IsEmailInDb(string email){
            if (await _db.Users.AnyAsync(e => e.Email.ToLowerInvariant() == email.ToLowerInvariant()))
            {
                return(true);
            }
            return(false);
        }

        public async Task<User> Register(RegisterData data)
        {
            // Does email exist?
            if (await _db.Users.AnyAsync(e => e.Email == data.Email))
            {
                throw new Exception(CreateAccountErrorMessage);
            }

            var user = new User
            {
                Email = data.Email,
                Firstname = data.Firstname,
                Lastname = data.Lastname,
                DateOfBirth = data.DateOfBirth,
                Token = Guid.NewGuid().ToString()
            };

            var hashedPassword = _passwordHasher.HashPassword(user, data.Password);
            user.Password = hashedPassword;

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(data.Email), "Welcome to the Marshmallow's Webshop",
                $"Hi {user.Firstname} {user.Lastname}!\n\nWe're glad to have you on board. Stay awhile and listen! You can now purchase your favourite tunes and keep track of your order history.\n Be sure to check in regularly for the latest music from your favourite artists. Happy listening!");

            return user;
        }

        public async Task<User> RegisterAnonymously(string email)
        {
            // Does email exist?
            if (await _db.Users.AnyAsync(e => e.Email == email))
            {
                throw new Exception(CreateAccountErrorMessage);
            }

            var anonymousRegistrationToken = Guid.NewGuid().ToString();

            var user = new User
            {
                Email = email,
                AnonymousRegistrationToken = anonymousRegistrationToken,
                Token = Guid.NewGuid().ToString()
            };

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(email), "Active your Marshmallow's Webshop Account",
                $"Hi {user.Firstname} {user.Lastname}!\n\nWe're glad you're on board.\nHowever, your account is not yet fully set up.\nTo finish the process, you must set a password; please visit: https://localhost:3000/auth/register/{anonymousRegistrationToken}");
            // Don't emit password to client
//            user.Password = null;

            return user;
        }
        public async Task<User> Login(LoginData data)
        {
            var user = await _db.Users.FirstOrDefaultAsync(e => e.Email == data.Email);
            if (user == null)
            {
                throw new Exception(LoginFailErrorMessage);
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, data.Password);
            switch (result)
            {
                case PasswordVerificationResult.Failed:
                    throw new Exception(LoginFailErrorMessage);
                case PasswordVerificationResult.SuccessRehashNeeded:
                {
                    var rehashedPassword = _passwordHasher.HashPassword(user, data.Password);
                    user.Password = rehashedPassword;
                    user.Token = Guid.NewGuid().ToString();
                    await _db.SaveChangesAsync();
                    break;
                }
            }

            // http://jasonwatmore.com/post/2018/08/14/aspnet-core-21-jwt-authentication-tutorial-with-example-api
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(_appEnv.JwtSecret);
//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[]
//                {
//                    new Claim(ClaimTypes.Name, user.Id.ToString())
//                }),
//                Expires = DateTime.UtcNow.AddDays(7),
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
//                    SecurityAlgorithms.HmacSha256Signature)
//            };
//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            user.Token = tokenHandler.WriteToken(token);

            // Don't emit password to client
//            user.Password = null;

            return user;
        }

        public async Task<User> GetUserByToken(string token)
        {
            var user = await _db.Users.FirstOrDefaultAsync(e => e.Token == token);
            if (user == null)
            {
                throw new UserNotFoundForAuthTokenException(token);
            }
            return user;
        }

        public async Task AddToWishlist(int userId, int productId)
        {
            // Is product already in the users wishlist
            if (await _db.WishlistUserXProducts.AnyAsync(x => x.UserId == userId && x.ProductId == productId))
            {
                throw new Exception("Product is already in the user's wishlist");
            }

            var wishlistEntry = new Wishlist_UserXProduct
            {
                UserId = userId,
                ProductId = productId
            };
            await _db.AddAsync(wishlistEntry);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveFromWishlist(int userId, int productId)
        {
            var entry = await _db.WishlistUserXProducts.FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == productId);
            // Does the product even exist in the wishlist, can't remove what you don't have amirite?
            if (entry == null)
            {
                throw new Exception("Product does not exist in the user's wishlist");
            }

            _db.Remove(entry);
            await _db.SaveChangesAsync();
        }

        public async Task ChangePassword(int userId, string currentPassword, string newPassword)
        {
            var user = await _db.Users.FirstAsync(x => x.Id == userId);
            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, currentPassword);
            if (verificationResult == PasswordVerificationResult.Failed)
            {
                throw new Exception("The current password given is incorrect.");
            }

            var newHash = _passwordHasher.HashPassword(user, newPassword);
            user.Password = newHash;

            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(user.Email), "Your password for your Marshmallow Webshop account has been changed succesfully.",
            $"Greetings {user.Firstname} {user.Lastname}!\n\n You succesfully changed your password for your registered account on Marshmallow Webshop.\n You can now use this password to log in to your account. Keep this password safe.\n If you did not permit this change, please contact us using the contact information displayed on the Marshmallow Webshop. ");
        }

        public async Task ChangeEmail(int userId, string newEmail) 
        {
            if (await _db.Users.AnyAsync(e => e.Email == newEmail))
            {
                throw new Exception(CreateAccountErrorMessage);
            }

            var user = await _db.Users.FirstAsync(x => x.Id == userId);
            System.Console.WriteLine("From changeEmail Task: User is: ");
            System.Console.WriteLine(user);
            user.Email = newEmail;

            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(newEmail), "Your email address for Marshmallow's Webshop has been changed succesfully.",
                $"Hi {user.Email}!\n\nYou email address has been succesfully altered.\n\nFrom now on you will receive emails from the Marshmallow Webshop at this address.\nIf you did not permit this change, please contact us using the contact information displayed on the Marshmallow Webshop.");
        }

        public async Task ChangeName(int userId, string newFirstName, string newLastName)
        {
            var user = await _db.Users.FirstAsync(x => x.Id == userId);
            user.Firstname = newFirstName;
            user.Lastname = newLastName;

            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(user.Email), "Your name on your Marshmallow Webshop account has been changed succesfully.",
            $"Hey {user.Firstname} {user.Lastname}!\n\n You succesfully changed your name for your registered account on Marshallow Webshop.\n\nWe will have to get used to calling you {user.Firstname} {user.Lastname} from now on!");
        }

        public async Task<User> ChangeBirthDate(int userId, DateTime newBirthDate)
        {
            var user = await _db.Users.FirstAsync(x => x.Id == userId);
            user.DateOfBirth = newBirthDate;

            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(user.Email), "Your date of birth on your Marshmallow Webshop account has been succesfully updated",
            $"Hello {user.Firstname} {user.Lastname}!\n\n You have succesfully changed your date of birth on your Marshallow Webshop account to {user.DateOfBirth.ToShortDateString()}.\n\nHappy listening!");

            return user;
        }
        
        public async Task MergeWishlist(int userId, List<int> localProductIds)
        {
            var onlineStoredProductIds = await _db.WishlistUserXProducts.Where(x => x.UserId == userId)
                .Select(x => x.ProductId).ToListAsync();
            var newEntries = localProductIds.Where(x => !onlineStoredProductIds.Contains(x))
                .Select(x => new Wishlist_UserXProduct
                {
                    UserId = userId,
                    ProductId = x
                }).ToList();
            if (newEntries.Count == 0)
            {
                return;
            }
            await _db.AddRangeAsync(newEntries);
            await _db.SaveChangesAsync();
        }
    }
}