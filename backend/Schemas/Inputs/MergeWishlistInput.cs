using System.Collections.Generic;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class MergeWishlistData : AuthorizedData
    {
        /// <summary>
        /// The wishlist that was locally stored on the machine.
        /// </summary>
        public List<int> LocalProducts { get; set; }
    }

    public class MergeWishlistInput : AuthorizedBaseInputTypeGraph<MergeWishlistData>
    {
        public MergeWishlistInput()
        {
            Field(x => x.LocalProducts).Description("The wishlist that was locally stored on the machine");
        }
    }
}