using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Schemas.Graphs.Mutations.Auth;
using backend_datamodel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<User> Register(RegisterData data);
        Task<User> RegisterAnonymously(string email);
        Task<User> Login(LoginData data);
    }

    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _db;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAppEnv _appEnv;
        private readonly IEmailService _emailService;
        private const string LoginFailErrorMessage = "A user with that email/password combination does not exist.";
        private const string CreateAccountErrorMessage = "A user with that email address already exist.";
        
        public AccountService(DatabaseContext db, IPasswordHasher<User> passwordHasher, IAppEnv appEnv,
            IEmailService emailService)
        {
            _db = db;
            _passwordHasher = passwordHasher;
            _appEnv = appEnv;
            _emailService = emailService;
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
                DateOfBirth = data.DateOfBirth
            };

            var hashedPassword = _passwordHasher.HashPassword(user, data.Password);
            user.Password = hashedPassword;

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(data.Email), "Welcome to the Marshmallow's Webshop",
                $"Hi {user.Email}!\n\nWe're glad you're on board.");
            // Don't emit password to client
//            user.Password = null;

            return user;
        }

        public async Task<User> RegisterAnonymously(string email)
        {
            // Does email exist?
            if (await _db.Users.AnyAsync(e => e.Email == email))
            {
                throw new Exception("A user with that email address already exist.");
            }

            var anonymousRegistrationToken = Guid.NewGuid().ToString();

            var user = new User
            {
                Email = email,
                AnonymousRegistrationToken = anonymousRegistrationToken
            };

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            await _emailService.SendEmail(new MailAddress(email), "Active your Marshmallow's Webshop Account",
                $"Hi {user.Email}!\n\nWe're glad you're on board.\n\nHowever, your account is not yet fully set up.\nTo finish the process, you must set a password, please visit: https://localhost:3000/auth/register/{anonymousRegistrationToken}");
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
                    await _db.SaveChangesAsync();
                    break;
                }
            }

            // http://jasonwatmore.com/post/2018/08/14/aspnet-core-21-jwt-authentication-tutorial-with-example-api
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appEnv.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // Don't emit password to client
//            user.Password = null;

            return user;
        }
    }
}