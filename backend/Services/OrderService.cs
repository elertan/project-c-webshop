using System;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Schemas.Inputs;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(CreateOrderData data);
        
    }

    public class OrderService : IOrderService
    {
        private readonly DatabaseContext _db;
        private readonly IEmailService _emailService;
            
       
        
        public OrderService(DatabaseContext db, IEmailService emailService)
        {
            _db = db;
            _emailService = emailService;
            
        }

        public async Task<Order> CreateOrder(CreateOrderData data)
        {
            if (await _db.Orders.AnyAsync(e => e.User.Email == data.UserEmail))
            {
                throw new Exception("A user with that order already exist.");
            }  
            
            var order = new Order
            {
                User = new User{Email = data.UserEmail}
                
                
               
            };
            
            await _db.Orders.AddAsync(order);
            await _db.SaveChangesAsync();
            await _emailService.SendEmail(new MailAddress(data.UserEmail), "Welcome to Marshmallow webshop",
                "You have created an order succesfully");

            return order;
        }
    }
}