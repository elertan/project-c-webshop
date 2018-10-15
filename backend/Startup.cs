using System;
using System.Collections.Generic;
using System.Linq;
using GraphQL;
using GraphQL.Http;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using backend.Schemas;
using backend.Schemas.Types;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
            
            var dbConnectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING");
            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(dbConnectionString);
            
            services.AddEntityFrameworkNpgsql().AddDbContext<DatabaseContext>(
                options => options.UseNpgsql(dbConnectionString),
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

            // Create a dependency resolver for GraphQL
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));

            // Query parser stuff
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<IDocumentWriter, DocumentWriter>();

            // GraphQL Queries, Mutations and Types
//            services.AddSingleton<TrackType>();
//            services.AddSingleton<ProductType>();
//            services.AddSingleton<ArtistType>();
//            services.AddSingleton<AlbumType>();
//            services.AddSingleton<UserType>();
//            services.AddSingleton<RootQuery>();
            services.AddSingleton<ISchema, RootSchema>();

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

            // use graphql-playground at default url /ui/playground
//            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
//            {
//                Path = "/ui/playground"
//            });
            
            // Use GraphiQL instead of GraphQL playground
            app.UseGraphiQl("graphiql");

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
