using EducationalSystem.Hubs;
using EducationalSystem.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StudentLibrary.SM_CLASSES;
using System.Data;

namespace EducationalSystem.Controllers.Api.Sm
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModulesController : ControllerBase
    {
        public DataTable Dt { get; set; }
        public SqlConnection Conn;
        private readonly Sm_MasterInterface repository;
        private readonly IHubContext<ModulesHub> moduleHub;

        public ModulesController(IConfiguration configuration, Sm_MasterInterface repository,IHubContext<ModulesHub> moduleHub)
        {
            Configuration = configuration;
            this.repository = repository;
            this.moduleHub = moduleHub;
            Conn = new SqlConnection(configuration.GetConnectionString("StudentDbConnection"));
        }
        public IConfiguration Configuration { get; }

        [HttpGet, Route("/api/sm_master/modules/")]
        public ActionResult<DataTable> GetData()
        {
            List<SM_MODULES> obj = GetModules();
            var activeModules = from module in obj where module.IS_DELETED == true select module;
           Dt = new DataTable();
            Conn.Open();
            SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM SM_MODULES WHERE IS_DELETED = 0", Conn);
            Conn.Close();
            adapter.Fill(Dt);
            return Dt;
        }

        [HttpPost, Route("/api/sm_master/modules/")]
        public async Task<ActionResult> ActionHandler(SM_MODULES model)
        {            
            try
            {
                if(model.IS_UPDATED == true || model.IS_DELETED == true)
                {
                    if(await repository.EDIT_MODULE(model))
                    {
                         return StatusCode(StatusCodes.Status200OK, "Process updated successfully");
                    }
                }
                else
                {
                    var tmp = await repository.ADD_MODULE(model);
                    if (tmp != null)
                    {
                        model.ID = model.ID;
                        await moduleHub.Clients.All.SendAsync("newModuleCreated", model);
                        return StatusCode(StatusCodes.Status200OK, "Process complete successfully");
                    }
                }
                
                return StatusCode(StatusCodes.Status400BadRequest, "Process failed");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Add Module");
            }

        }

        private List<SM_MODULES> GetModules()
        {
            List<SM_MODULES> obj = new List<SM_MODULES>();
            return obj;
        }
    }
}
