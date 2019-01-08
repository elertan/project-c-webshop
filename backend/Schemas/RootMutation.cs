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

            Field<ApiResultGraph<TrackGraph, AlbumXTrack>>(
                "updateTrackData",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UpdateAlbumXTrackDataInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapAdminAuth(
                    GraphQLFieldResolveUtils.WrapApiResultTryCatch(UpdateTrackData),
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

        private async Task<ApiResult<Album>> DeleteAlbum(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<DeleteAlbumData>("data");

            var album = await _db.Albums.FirstAsync(x => x.Id == data.AlbumId);

            _db.Albums.Remove(album);
            await _db.SaveChangesAsync();

            return new ApiResult<Album> { Data = album };
        }

         private async Task<ApiResult<Track>> UpdateTrackData(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<UpdateTrackData>("data");

            var e = await _db.Tracks.FirstAsync(x => x.Id == data.Id);
            
           

            await _db.SaveChangesAsync();

            return new ApiResult<Track> {Data = e};
        }
    }
}