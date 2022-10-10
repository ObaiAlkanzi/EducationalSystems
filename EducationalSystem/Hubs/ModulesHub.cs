using Microsoft.AspNetCore.SignalR;
using StudentLibrary.SM_CLASSES;

namespace EducationalSystem.Hubs
{
    public class ModulesHub:Hub
    {
        public async Task NewModuleCreated()
        {
            SM_MODULES obj = new SM_MODULES();
            await Clients.All.SendAsync("newModuleCreated", obj);
        }
    }
}
