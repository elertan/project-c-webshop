namespace backend.Models
{
    public class Track : BaseEntity
    {
        public string Name { get; set; }
        public virtual Artist Artist { get; set; }
    }
}