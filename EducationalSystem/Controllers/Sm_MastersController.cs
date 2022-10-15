using Microsoft.AspNetCore.Mvc;

namespace EducationalSystem.Controllers
{
    public class Sm_MastersController : Controller
    {
        public IActionResult Modules()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
