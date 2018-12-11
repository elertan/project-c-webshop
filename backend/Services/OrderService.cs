using System;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Schemas.Exceptions;
using backend.Schemas.Inputs;
using backend_datamodel.Models;
using backend_datamodel.Models.Crosstables;
using Microsoft.EntityFrameworkCore;
using MoreLinq;

namespace backend.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(CreateOrderData data);
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
        /// Creates an order for a registered user
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<Order> CreateOrder(CreateOrderData data)
        {
            var user = await _accountService.GetUserByToken(data.AuthToken);
            
            // Create order
            var order = new Order
            {
                User = user
            };
            // Create links between order and products for that order
            var orderXProductEntries = data.ProductIds.Select(id => new OrderXProduct
            {
                Order = order,
                ProductId = id
            });
            
            await _db.AddAsync(order);
            await _db.AddRangeAsync(orderXProductEntries);
            await _db.SaveChangesAsync();

            return order;
        }

        /// <summary>
        /// Creates an order for a non-registered user
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<Order> CreateAnonymousOrder(CreateAnonymousOrderData data)
        {
            // Make sure there are no duplicate entries
//            data.ProductIds = data.ProductIds.DistinctBy(x => x).ToArray();
            
            // Check if the entered email is already coupled to a registered user.
            // If this is the case, the given user should log in to their account to proceed with the order.
            var alreadyExistingUser = await _db.Users.FirstOrDefaultAsync(e => e.Email == data.Email);
            if (alreadyExistingUser != null)
            {
                throw new EmailHasKnownUserException(alreadyExistingUser);
            }

            var user = await _accountService.RegisterAnonymously(data.Email);
            
            // Create order
            var order = new Order
            {
                User = user
            };
            // Create links between order and products for that order
            var orderXProductEntries = data.ProductIds.Select(id => new OrderXProduct
            {
                Order = order,
                ProductId = id
            });
            
            await _db.AddAsync(order);
            await _db.AddRangeAsync(orderXProductEntries);
            await _db.SaveChangesAsync();   

            return order;
        }
    }
}