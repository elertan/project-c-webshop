using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Graphs;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface ISearchService
    {
        Task<SearchResult> SearchFor(string query);
    }
    
    public class SearchService : ISearchService
    {
        private readonly DatabaseContext _db;

        public SearchService(DatabaseContext db)
        {
            _db = db;
        }
        
        public async Task<SearchResult> SearchFor(string query)
        {
            var q = query.ToLowerInvariant();
            
            var tracksTask = _db.Tracks.Where(x => x.Name.ToLowerInvariant().Contains(q)).ToListAsync();
            var albumsTask = _db.Albums.Where(x => x.Name.ToLowerInvariant().Contains(q)).ToListAsync();
            var artistsTask = _db.Artists.Where(x => x.Name.ToLowerInvariant().Contains(q)).ToListAsync();
            var categoriesTask = _db.Categories.Where(x => x.Name.ToLowerInvariant().Contains(q)).ToListAsync();

            await Task.WhenAll(tracksTask, albumsTask, artistsTask, categoriesTask);
            
            var result = new SearchResult
            {
                Tracks = tracksTask.Result,
                Albums = albumsTask.Result,
                Artists = artistsTask.Result,
                Categories = categoriesTask.Result
            };

            return result;
        }
    }
}