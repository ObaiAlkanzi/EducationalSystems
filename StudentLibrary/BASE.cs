namespace StudentLibrary
{
    public class BASE
    {
        public int ID { get; set; }
        public bool IS_UPDATED { get; set; }
        public bool IS_DELETED { get; set; }
        public DateTime CREATED_AT { get; set; }
        public DateTime UPDATED_AT { get; set; }
        public DateTime DELETED_AT { get; set; }
    }
}