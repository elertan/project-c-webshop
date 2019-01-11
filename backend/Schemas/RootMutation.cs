using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Exceptions;
using backend.Schemas.Graphs;
using backend.Schemas.Inputs;
using backend.Services;
using backend.Utils;
using backend_datamodel.Models;
using backend_datamodel.Models.Crosstables;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas
{
    public class RootMutation : EfObjectGraphType<object>
    {
        private readonly IAccountService _accountService;
        private readonly IOrderService _orderService;
        private readonly DatabaseContext _db;

        public RootMutation(IEfGraphQLService service, IAccountService accountService, IOrderService orderService, DatabaseContext db) :
            base(service)
        {
            _accountService = accountService;
            _orderService = orderService;
            _db = db;
            Name = "Mutation";

            Field<ApiResultGraph<UserGraph, User>>(
                "register",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RegisterInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateAccountResolveFn));

            Field<ApiResultGraph<UserGraph, User>>(
                "login",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LoginInput>> { Name = "data" }),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(LoginResolveFn));

            Field<ApiResultGraph<OrderGraph, Order>>(
                "createOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateOrderInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateOrderResolveFn)
            );

            Field<ApiResultGraph<OrderGraph, Order>>(
                "createAnonymousOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAnonymousOrderInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateAnonymousOrderResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "addToWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddToWishlistInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddToWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "removeFromWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RemoveFromWishlistInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(RemoveFromWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "mergeWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<MergeWishlistInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(MergeWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "changePassword",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangePasswordInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangePasswordResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "changeEmail",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangeEmailInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangeEmailResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "changeName",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangeNameInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangeNameResolveFn)
            );

            Field<ApiResultGraph<UserGraph, User>>(
                "changeBirthDate",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangeBirthDateInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangeBirthDateResolveFn)
            );

            Field<ApiResultGraph<UserGraph, User>>(
                "updateUserData",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UpdateUserDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateUserData)
            );

            Field<ApiResultGraph<UserGraph, User>>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DeleteUserDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(DeleteUser),
                    accountService
                )
            );

            Field<ApiResultGraph<UserGraph, User>>(
                "addUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddUserDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddUser),
                    accountService
                )
            );

            Field<ApiResultGraph<AlbumGraph, Album>>(
                "addAlbum",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddAlbumDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddAlbum),
                    accountService
                )
            );

            Field<ApiResultGraph<AlbumGraph, Album>>(
                "updateAlbumData",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UpdateAlbumDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateAlbumData),
                    accountService
                )
            );

            Field<ApiResultGraph<AlbumGraph, Album>>(
                "deleteAlbum",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DeleteAlbumDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(DeleteAlbum),
                    accountService
                )
            );

            Field<ApiResultGraph<TrackGraph, Track>>(
                "addTrack",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddTrackDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddTrack),
                    accountService
                )
            );

            Field<ApiResultGraph<TrackGraph, Track>>(
               "updateTrackData",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<UpdateTrackDataInput>> { Name = "data" }
               ),
               resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                   GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateTrackData),
                   accountService
               )
           );

            Field<ApiResultGraph<TrackGraph, Track>>(
               "deleteTrack",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<DeleteTrackDataInput>> { Name = "data" }
               ),
               resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                   GraphQLFieldResolveUtils.WrapApiResultTryCatch(DeleteTrack),
                   accountService
               )
            );

            Field<ApiResultGraph<ArtistGraph, Artist>>(
                 "addArtist",
                 arguments: new QueryArguments(
                     new QueryArgument<NonNullGraphType<AddArtistDataInput>> { Name = "data" }
                 ),
                 resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                     GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddArtist),
                     accountService
                 )
             );

            Field<ApiResultGraph<ArtistGraph, Artist>>(
               "updateArtistData",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<UpdateArtistDataInput>> { Name = "data" }
               ),
               resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                   GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateArtistData),
                   accountService
               )
           );

            Field<ApiResultGraph<ArtistGraph, Artist>>(
               "deleteArtist",
               arguments: new QueryArguments(
                   new QueryArgument<NonNullGraphType<DeleteArtistDataInput>> { Name = "data" }
               ),
               resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                   GraphQLFieldResolveUtils.WrapApiResultTryCatch(DeleteArtist),
                   accountService
               )
           );

            Field<ApiResultGraph<AlbumXTrackGraph, AlbumXTrack>>(
                "updateAlbumXTrackData",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UpdateAlbumXTrackDataInput>> { Name = "data" }
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateAlbumXTrackData),
                    accountService
                )
            );
        }

        private async Task<ApiResult<User>> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RegisterData>("data");

            var user = await _accountService.Register(data);
            return new ApiResult<User> { Data = user };
        }

        private async Task<ApiResult<User>> LoginResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<LoginData>("data");

            var user = await _accountService.Login(data);
            return new ApiResult<User> { Data = user };
        }
        private async Task<ApiResult<Order>> CreateOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateOrderData>("data");

            var order = await _orderService.CreateOrder(data);
            return new ApiResult<Order> { Data = order };
        }

        private async Task<ApiResult<Order>> CreateAnonymousOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAnonymousOrderData>("data");

            var order = await _orderService.CreateAnonymousOrder(data);
            return new ApiResult<Order> { Data = order };
        }

        private async Task<ApiResult<bool>> AddToWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<AddToWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.AddToWishlist(user.Id, data.ProductId);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<bool>> RemoveFromWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RemoveFromWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.RemoveFromWishlist(user.Id, data.ProductId);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<bool>> MergeWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<MergeWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.MergeWishlist(user.Id, data.LocalProducts);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<bool>> ChangePasswordResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangePasswordData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangePassword(user.Id, data.CurrentPassword, data.NewPassword);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<bool>> ChangeEmailResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangeEmailData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangeEmail(user.Id, data.NewEmail);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<bool>> ChangeNameResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangeNameData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangeName(user.Id, data.NewFirstName, data.NewLastName);
            return new ApiResult<bool> { Data = true };
        }

        private async Task<ApiResult<User>> ChangeBirthDateResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangeBirthDateData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangeBirthDate(user.Id, data.NewBirthDate);
            return new ApiResult<User> { Data = user };
        }

        private async Task<ApiResult<User>> UpdateUserData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateUserData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);
            if (!await _accountService.IsUserAdmin(user.Id))
            {
                throw new NotAdminException(user);
            }

            var u = await _db.Users.FirstAsync(x => x.Id == data.UserId);

            if (data.Password != null)
            {
                u.Password = _accountService.HashNewPassword(u, data.Password);
            }

            if (data.Email != null)
            {
                u.Email = data.Email;
            }

            if (data.Firstname != null)
            {
                u.Firstname = data.Firstname;
            }

            if (data.Lastname != null)
            {
                u.Lastname = data.Lastname;
            }

            if (data.Token != null)
            {
                u.Token = data.Token;
            }

            if (data.DateOfBirth != null)
            {
                u.DateOfBirth = DateTime.Parse(data.DateOfBirth);
            }

            await _db.SaveChangesAsync();

            return new ApiResult<User> { Data = u };
        }

        private async Task<ApiResult<User>> DeleteUser(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<DeleteUserData>("data");

            var u = await _db.Users.FirstAsync(x => x.Id == data.UserId);
            _db.Users.Remove(u);
            await _db.SaveChangesAsync();

            return new ApiResult<User> { Data = u };
        }

        private async Task<ApiResult<User>> AddUser(ResolveFieldContext<object> ctx)
        {
            var data = ctx.GetArgument<AddUserData>("data");

            if (await _db.Users.FirstOrDefaultAsync(x => x.Email == data.Email) != null)
            {
                throw new Exception("A user with that email already exists.");
            }

            var user = new User
            {
                Email = data.Email,
                Token = data.Token,
                Firstname = data.Firstname,
                Lastname = data.Lastname,
                DateOfBirth = data.DateOfBirth
            };
            user.Password = _accountService.HashNewPassword(user, data.Password);

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            return new ApiResult<User> { Data = user };
        }

        private async Task<ApiResult<Album>> UpdateAlbumData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateAlbumData>("data");

            var album = await _db.Albums.FirstAsync(x => x.Id == data.AlbumId);

            if (data.Name != null)
            {
                album.Name = data.Name;
            }

            if (data.Label != null)
            {
                album.Label = data.Label;
            }

            if (data.Popularity != null)
            {
                album.Popularity = data.Popularity.Value;
            }

            if (data.AlbumType != null)
            {
                album.AlbumType = data.AlbumType;
            }
            await _db.SaveChangesAsync();

            return new ApiResult<Album> { Data = album };
        }

        private async Task<ApiResult<Album>> DeleteAlbum(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<DeleteAlbumData>("data");

            var album = await _db.Albums.FirstAsync(x => x.Id == data.AlbumId);

            _db.Albums.Remove(album);
            await _db.SaveChangesAsync();

            return new ApiResult<Album> { Data = album };
        }

        private async Task<ApiResult<Album>> AddAlbum(ResolveFieldContext<object> ctx)
        {
            var data = ctx.GetArgument<AddAlbumData>("data");

            if (await _db.Albums.FirstOrDefaultAsync(x => x.Id == data.AlbumId) != null)
            {
                throw new Exception("An album with that ID already exists.");
            }

            var album = new Album
            {
                Id = data.AlbumId,
                Name = data.Name,
                Label = data.Label,
                Popularity = data.Popularity,
                AlbumType = data.AlbumType
            };

            await _db.Albums.AddAsync(album);
            await _db.SaveChangesAsync();

            return new ApiResult<Album> { Data = album };
        }

        private async Task<ApiResult<AlbumXTrack>> UpdateAlbumXTrackData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateAlbumXTrackData>("data");

            var e = await _db.AlbumXTracks.FirstAsync(x => x.Id == data.AlbumXTrackId);

            if (data.TrackId != null)
            {
                e.TrackId = data.TrackId.Value;
            }

            if (data.AlbumId != null)
            {
                e.AlbumId = data.AlbumId.Value;
            }
            await _db.SaveChangesAsync();

            return new ApiResult<AlbumXTrack> { Data = e };
        }

        private async Task<ApiResult<Track>> UpdateTrackData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateTrackData>("data");

            var track = await _db.Tracks.FirstAsync(x => x.Id == data.TrackId);
            if (data.Name != null)
            {
                track.Name = data.Name;
            }

            await _db.SaveChangesAsync();

            return new ApiResult<Track> { Data = track };
        }

        private async Task<ApiResult<Track>> DeleteTrack(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<DeleteTrackData>("data");

            var track = await _db.Tracks.FirstAsync(x => x.Id == data.TrackId);

            _db.Tracks.Remove(track);
            await _db.SaveChangesAsync();

            return new ApiResult<Track> { Data = track };
        }

        private async Task<ApiResult<Track>> AddTrack(ResolveFieldContext<object> ctx)
        {
            var data = ctx.GetArgument<AddTrackData>("data");

            if (await _db.Tracks.FirstOrDefaultAsync(x => x.Id == data.TrackId) != null)
            {
                throw new Exception("A track with that ID already exists.");
            }

            var track = new Track
            {
                Id = data.TrackId,
                Name = data.Name,
            };

            await _db.Tracks.AddAsync(track);
            await _db.SaveChangesAsync();

            return new ApiResult<Track> { Data = track };
        }

        private async Task<ApiResult<Artist>> UpdateArtistData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateArtistData>("data");

            var artist = await _db.Artists.FirstAsync(x => x.Id == data.ArtistId);


            if (data.Name != null)
            {
                artist.Name = data.Name;
            }

            await _db.SaveChangesAsync();

            return new ApiResult<Artist> { Data = artist };
        }
        private async Task<ApiResult<Artist>> AddArtist(ResolveFieldContext<object> ctx)
        {
            var data = ctx.GetArgument<AddArtistData>("data");

            if (await _db.Artists.FirstOrDefaultAsync(x => x.Name == data.Name) != null)
            {
                throw new Exception("A artist with that name already exists.");
            }

            var artist = new Artist
            {
                Name = data.Name,
                SpotifyId = data.SpotifyId
            };

            await _db.Artists.AddAsync(artist);
            await _db.SaveChangesAsync();

            return new ApiResult<Artist> { Data = artist };
        }

        private async Task<ApiResult<Artist>> DeleteArtist(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<DeleteArtistData>("data");

            var artist = await _db.Artists.FirstAsync(x => x.Id == data.ArtistId);

            _db.Artists.Remove(artist);
            await _db.SaveChangesAsync();

            return new ApiResult<Artist> { Data = artist };
        }
    }
}