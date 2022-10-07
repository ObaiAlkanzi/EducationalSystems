using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentLibrary.SM_VIEWMODELS
{
    public class USER_VM:BASE
    {
        public int USER_ID { get; set; }
        public string NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string PROFILE { get; set; }
        public string PASSWORD { get; set; }
    }
}
