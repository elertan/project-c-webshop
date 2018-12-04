using System;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Schemas.Graphs.Mutations.Order;
using backend.Schemas.Graphs.Mutations.Order.Exceptions;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IOrderService
    {
        Task<Order> CreateAnonymousOrder(CreateAnonymousOrderData data);
    }

    public class OrderService : IOrderService
    {
        private readonly DatabaseContext _db;
        private readonly IAccountService _accountService;

        public OrderService(DatabaseContext db, IAccountService accountService)
        {
            _db = db;
            _accountService = accountService;
        }

        /// <summary>
        /// Creates an order for a non-registered user
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<Order> CreateAnonymousOrder(CreateAnonymousOrderData data)
        {
            // Check if the entered email is already coupled to a registered user.
            // If this is the case, the given user should log in to their account to proceed with the order.
            var alreadyExistingUser = await _db.Users.FirstOrDefaultAsync(e => e.Email == data.Email);
            if (alreadyExistingUser != null)
            {
                throw new EmailHasKnownUserException(alreadyExistingUser);
            }

            await _accountService.RegisterAnonymously(data.Email);
            
            throw new NotImplementedException("Order creation is not yet implemented.");
            
//            var order = new Order
//            {
//                User = new User{Email = data.UserEmail}
//            };
//            
//            await _db.Orders.AddAsync(order);
//            await _db.SaveChangesAsync();
//
//            return order;
        }
    }
}