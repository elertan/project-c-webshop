using System.Threading.Tasks;
using backend_datamodel.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<User> CreateAccount(object data);
    }
    
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _db;

        public AccountService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<User> CreateAccount(object data)
        {
            await Task.Delay(3000);
            return new User() { Email = "hallo@tim.com"};
        }
    }
}