using System.Collections.Generic;
using backend_filling_tool_v2.SpotifyDTOs;
using Artist = backend_filling_tool_v2.SpotifyDTOs.Extended.Artist;

namespace backend_filling_tool_v2
{
    public class SpotifyDataset
    {
        public List<Category> Categories;
        public Dictionary<Category, List<Playlist>> PlaylistsByCategories;
        public Dictionary<Playlist, List<Track>> TracksByPlaylists;
    }
}