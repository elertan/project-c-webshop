using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IEmailService
    {
        Task SendEmail(MailAddress recipientAddress, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private SmtpClient _smtpClient;
        const string _password = "Dildos69";

        private readonly MailAddress _fromAddress =
            new MailAddress("noreply.flyingmarshmallows@gmail.com", "Team flying marshmallows");

        public EmailService()
        {
            _smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(_fromAddress.Address, _password),
                Timeout = 20000
            };
        }

        public async Task SendEmail(MailAddress recipientAddress, string subject, string body)
        {
            using (var message = new MailMessage(_fromAddress, recipientAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                await _smtpClient.SendMailAsync(message);
            }
        }
    }
}