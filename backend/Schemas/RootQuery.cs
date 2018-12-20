using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Graphs;
using backend.Schemas.Graphs.UserContext;
using backend.Services;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas
{
    public class RootQuery : EfObjectGraphType<object>
    {
        public RootQuery(DatabaseContext db, IEfGraphQLService efGraphQlService, IAccountService accountService, ISearchService searchService) : base(efGraphQlService)
        {
            Name = "Query";
            
            AddQueryConnectionField<ProductGraph, Product>(
                name: "products",
                resolve: ctx => db.Products);
            AddQueryConnectionField<ArtistGraph, Artist>(
                name: "artists",
                resolve: ctx => db.Artists);
            AddQueryConnectionField<TrackGraph, Track>(
                name: "tracks",
                resolve: ctx => db.Tracks);
            AddQueryConnectionField<AlbumGraph, Album>(
                name: "albums",
                resolve: ctx => db.Albums);
            AddQueryConnectionField<GenreGraph, Genre>(
                name: "genres",
                resolve: ctx => db.Genres);
            AddQueryConnectionField<CategoryGraph, Category>(
                name: "categories",
                resolve: ctx => db.Categories);

            FieldAsync<UserContextGraph, User>(
                name: "me",
                arguments: new QueryArguments(
                    new QueryArgument(typeof(StringGraphType)) {Name = "token"}
                ),
                resolve: async ctx =>
                {
                    var token = ctx.GetArgument<string>("token");
                    try
                    {
                        var user = await accountService.GetUserByToken(token);
                        return user;
                    }
                    catch
                    {
                        return null;
                    }
                }
            );
            
            FieldAsync<AdminContextGraph, User>(
                name: "admin",
                arguments: new QueryArguments(
                    new QueryArgument(typeof(StringGraphType)) {Name = "token"}
                ),
                resolve: async ctx =>
                {
                    var token = ctx.GetArgument<string>("token");
                    try
                    {
                        var user = await accountService.GetUserByToken(token);
                        if (!await accountService.IsUserAdmin(user.Id))
                        {
                            return null;
                        }
                        return user;
                    }
                    catch
                    {
                        return null;
                    }
                }
            );

            FieldAsync<SearchResultGraph, SearchResult>(
                name: "searchFor",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> {Name="query"}
                ),
                resolve: async ctx =>
                {
                    var query = ctx.GetArgument<string>("query");
                    var searchResult = await searchService.SearchFor(query);
                    return searchResult;
                }
            );
        }
    }
}