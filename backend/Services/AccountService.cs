using System.Threading.Tasks;
using backend.Schemas.Inputs;
using backend_datamodel.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<User> CreateAccount(CreateAccountData data);
    }
    
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _db;

        public AccountService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<User> CreateAccount(CreateAccountData data)
        {
            if ()
            return new User() { Email = "hallo@tim.com"};
        }
    }
}