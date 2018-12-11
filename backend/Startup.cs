using System;
using System.Collections.Generic;
using System.Linq;
using GraphQL;
using GraphQL.Http;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using backend.Schemas;
using backend.Services;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Load .env file
            try
            {
                DotNetEnv.Env.Load();
            }
            catch
            {
                throw new Exception("Something went wrong trying to load the .env file, have you created one based on the .env.bak file (does it exist?)");
            }

            var appEnv = new AppEnv
            {
                DbConnectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING"),
                JwtSecret = DotNetEnv.Env.GetString("JWT_SECRET")
            };

            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(appEnv.DbConnectionString);
            
            services.AddEntityFrameworkNpgsql().AddDbContext<DatabaseContext>(
                options => options.UseNpgsql(appEnv.DbConnectionString),
                ServiceLifetime.Singleton
            );
            
            // GraphQL.EF (Filtering)
            EfGraphQLConventions.RegisterConnectionTypesInContainer(services);
            using (var ctx = new DatabaseContext(builder.Options))
            {
                EfGraphQLConventions.RegisterInContainer(services, ctx);
            }

            GetGraphQLTypes().ToList().ForEach(type => services.AddSingleton(type));
            
            // Enable CORS options
            services.AddCors();
            
            services.AddSingleton<ILogger, Logger>();
            services.AddSingleton<IAppEnv>(appEnv);
            services.AddSingleton<IEmailService, EmailService>();
           
            // Create a dependency resolver for GraphQL
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));

            // Query parser stuff
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<IDocumentWriter, DocumentWriter>();

            // GraphQL Queries, Mutations and Types
//            services.AddSingleton<TrackGraph>();
//            services.AddSingleton<ProductGraph>();
//            services.AddSingleton<ArtistGraph>();
//            services.AddSingleton<AlbumGraph>();
//            services.AddSingleton<UserGraph>();
         
            services.AddSingleton<RootQuery>();
            services.AddSingleton<ISchema, RootSchema>();

            services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
            
            // Custom Services
            services.AddSingleton<IAccountService, AccountService>();
            services.AddSingleton<IOrderService, OrderService>();
            services.AddSingleton<ISearchService, SearchService>();


            // Enable access to HttpContext
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Add GraphQL service
            services.AddGraphQL(_ =>
            {
                _.EnableMetrics = true;
                _.ExposeExceptions = true;
            })
                // Extract user information from the request
            .AddUserContextBuilder(httpContext => new GraphQLUserContext { User = httpContext.User });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Set CORS to allow any connection
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            // add http for Schema at default url /graphql
            app.UseGraphQL<ISchema>("/graphql");

            app.UseGraphiQl("/graphiql");
            // use graphql-playground at default url /ui/playground
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
            {
                Path = "/ui/playground"
            });

            // app.Run(async (context) =>
            // {
            //     await context.Response.WriteAsync("Hello World!");
            // });
        }
        
        static IEnumerable<Type> GetGraphQLTypes()
        {
            return typeof(Startup).Assembly
                .GetTypes()
                .Where(x => !x.IsAbstract &&
                            (typeof(IObjectGraphType).IsAssignableFrom(x) ||
                             typeof(IInputObjectGraphType).IsAssignableFrom(x)));
        }
    }
}
