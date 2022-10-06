using EducationalSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StudentLibrary.STUDENT;
using System.Data;

namespace EducationalSystem.Controllers.Api.Sm
{
    //[Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
       
        public DataTable Dt { get; set; }
        public SqlConnection Conn;
        public StudentController(IConfiguration configuration)
        {
            Configuration = configuration;
            Conn = new SqlConnection(configuration.GetConnectionString("StudentDbConnection"));
        }

        public IConfiguration Configuration { get; }

        [HttpGet,Route("/api/students")]
        public ActionResult<DataTable> GetStudents()
        {
           
            try
            {
                Dt = new DataTable();
                Conn.Open();
                SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM SM_STUDENT", Conn);
                Conn.Close();
                adapter.Fill(Dt);
                return Dt;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retriving data from database");
            }
        }

        [HttpPost,Route("/api/students")]
        public ActionResult ActionHandler(SM_STUDENT model)
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK,"Process complete successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Error retriving data from database");
            }
            
        }
    }
}
