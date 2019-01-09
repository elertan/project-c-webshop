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
        private readonly IEmailService _emailService;


        public OrderService(DatabaseContext db, IAccountService accountService, IEmailService emailService)
        {
            _db = db;
            _accountService = accountService;
            _emailService = emailService;
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
            
            var albums = await _db.Albums.Where(x => data.ProductIds.Contains(x.ProductId)).ToListAsync();
            var tracks = await _db.Tracks.Where(x => data.ProductIds.Contains(x.ProductId)).ToListAsync();
            
            await _emailService.SendEmail(
                new MailAddress(user.Email),
                "We've received your order",
                "Hi there!\n\nWe have successfully received your order.\nPlease sit back, in a few seconds we'll sent you a mail where you can access your purchased content.\n\nThanks for choosing The flying marshmallows"
            );

            await Task.Delay(3000);
            
            await _emailService.SendEmail(
                new MailAddress(user.Email),
                "Download your content",
                "As promised.\n\nYou can either go to the webshop to view your content, or use the links below to access the albums/tracks you purchased.\n\n" +
                (albums.Count == 0 ?
                    ""
                    :
                    "Albums:\n" + albums.Select(x => "-" + x.Name).Aggregate((curr, next) => curr + "\n" + next))
                +
                (tracks.Count == 0 ?
                    ""
                    :
                    "Tracks:\n" + tracks.Select(x => "-" + x.Name).Aggregate((curr, next) => curr + "\n" + next))
                + "\nEnjoy the music!"
            );

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

            var albums = await _db.Albums.Where(x => data.ProductIds.Contains(x.ProductId)).ToListAsync();
            var tracks = await _db.Tracks.Where(x => data.ProductIds.Contains(x.ProductId)).ToListAsync();
            
            await _db.AddAsync(order);
            await _db.AddRangeAsync(orderXProductEntries);
            await _db.SaveChangesAsync();
            await _emailService.SendEmail(
                new MailAddress(user.Email),
                "We've received your order",
                "Hi there!\n\nWe have successfully received your order.\nPlease sit back, in a few seconds we'll sent you a mail where you can access your purchased content.\n\nThanks for choosing The flying marshmallows"
            );

            await Task.Delay(3000);
            
            await _emailService.SendEmail(
                new MailAddress(user.Email),
                "Download your content",
                "As promised.\n\nYou can either go to the webshop to view your content, or use the links below to access the albums/tracks you purchased.\n\n" +
                (albums.Count == 0 ?
                    ""
                    :
                    "Albums:\n" + albums.Select(x => "-" + x.Name).Aggregate((curr, next) => curr + "\n" + next))
                +
                (tracks.Count == 0 ?
                    ""
                    :
                    "Tracks:\n" + tracks.Select(x => "-" + x.Name).Aggregate((curr, next) => curr + "\n" + next))
                + "\nEnjoy the music!"
            );

            return order;
        }
    }
}