using System.Collections.Generic;
using System.Linq;

namespace backend_filling_tool_v2
{
    public static class ExtensionMethods
    {
//        public static void DeleteAll<T>(this DbContext context)
//            where T : class
//        {
//            foreach (var p in context.Set<T>())
//            {
//                context.Entry(p).State = EntityState.Deleted;
//            }
//        }

        public static IEnumerable<IEnumerable<T>> ChunkBy<T>(this IEnumerable<T> sequence, int chunkSize)
        {
            return sequence.Select((s, i) => new {Value = s, Index = i})
                .GroupBy(x => x.Index / chunkSize)
                .Select(grp => grp.Select(x => x.Value));
        }
    }
}