using System.Security.Claims;

namespace backend {
  // ReSharper disable once InconsistentNaming
  public class GraphQLUserContext {
    public ClaimsPrincipal User { get; set; }
  }
}