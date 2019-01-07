using backend_datamodel.Models.Crosstables;
using GraphQL.EntityFramework;

namespace backend.Schemas.Graphs
{
    public class AlbumXTrackGraph : BaseGraphType<AlbumXTrack>
    {
        public AlbumXTrackGraph(IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Field(e => e.AlbumId);
            Field(e => e.TrackId);
        }
    }
}