using System.Security.Claims;

namespace backend {
  public class GraphQLUserContext {
    public ClaimsPrincipal User { get; set; }
  }
}