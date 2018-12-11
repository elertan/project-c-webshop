using System.Collections.Generic;
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Graphs
{
    public class SearchResult
    {
        public List<Track> Tracks { get; set; }
        public List<Album> Albums { get; set; }
        public List<Artist> Artists { get; set; }
        public List<Category> Categories { get; set; }
    }
    
    public class SearchResultGraph : ObjectGraphType<SearchResult>
    {
        public SearchResultGraph()
        {
            Field<ListGraphType<TrackGraph>>(
                "tracks",
                resolve: ctx => ctx.Source.Tracks
            );
            
            Field<ListGraphType<AlbumGraph>>(
                "albums",
                resolve: ctx => ctx.Source.Albums
            );
            
            Field<ListGraphType<ArtistGraph>>(
                "artists",
                resolve: ctx => ctx.Source.Artists
            );
            
            Field<ListGraphType<CategoryGraph>>(
                "categories",
                resolve: ctx => ctx.Source.Categories
            );
        }
    }
}