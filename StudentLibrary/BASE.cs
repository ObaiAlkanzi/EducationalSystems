namespace StudentLibrary
{
    public class BASE
    {
        public int ID { get; set; }
        public bool? IS_UPDATED { get; set; } = false;
        public bool? IS_DELETED { get; set; } = false;
        public DateTime? CREATED_AT { get; set; }
        public DateTime? UPDATED_AT { get; set; }
        public DateTime? DELETED_AT { get; set; }
        public int CREATED_BY { get; set; }
        public int? UPDATED_BY { get; set; } = 0;
        public int? DELETED_BY { get; set; } = 0;
    }
}