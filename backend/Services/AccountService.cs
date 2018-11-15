using System;
using System.Threading.Tasks;
using backend.Schemas.Inputs;
using backend_datamodel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<User> CreateAccount(CreateAccountData data);
    }
    
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _db;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(DatabaseContext db, IPasswordHasher<User> passwordHasher)
        {
            _db = db;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> CreateAccount(CreateAccountData data)
        {
            // Does email exist?
            if (await _db.Users.AnyAsync(e => e.Email == data.Email))
            {
                throw new Exception("An user with that email address already exist.");
            }
            
            var user = new User
            {
                Email = data.Email
            };
            
            var hashedPassword = _passwordHasher.HashPassword(user, data.Password);
            user.Password = hashedPassword;

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            return user;
        }
    }
}