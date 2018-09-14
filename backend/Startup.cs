using GraphQL;
using GraphQL.Http;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using backend.Models;
using backend.Schemas;
using backend.Schemas.Types;
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
            var dbConnectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING");
            services.AddEntityFrameworkNpgsql().AddDbContext<DatabaseContext>(
                options => options.UseNpgsql(dbConnectionString),
                ServiceLifetime.Singleton
            );
            
            // Enable CORS options
            services.AddCors();
            
            // Create a dependency resolver for GraphQL
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));

            // Query parser stuff
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<IDocumentWriter, DocumentWriter>();

            // GraphQL Queries, Mutations and Types
//            services.AddSingleton<StarWarsData>();
//            services.AddSingleton<StarWarsQuery>();
//            services.AddSingleton<StarWarsMutation>();
//            services.AddSingleton<HumanType>();
//            services.AddSingleton<HumanInputType>();
//            services.AddSingleton<DroidType>();
//            services.AddSingleton<CharacterInterface>();
//            services.AddSingleton<EpisodeEnum>();
            services.AddSingleton<TrackType>();
            services.AddSingleton<ArtistType>();
            services.AddSingleton<RootQuery>();
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
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
            {
                Path = "/ui/playground"
            });

            // app.Run(async (context) =>
            // {
            //     await context.Response.WriteAsync("Hello World!");
            // });
        }
    }
}
