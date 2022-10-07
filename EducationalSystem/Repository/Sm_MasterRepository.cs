using EducationalSystem.Models;
using Microsoft.EntityFrameworkCore;
using StudentLibrary.SM_CLASSES;

namespace EducationalSystem.Repository
{
    public class Sm_MasterRepository : Sm_MasterInterface
    {
        private readonly AppDbContext context;

        public Sm_MasterRepository(AppDbContext context)
        {
            this.context = context;
        }
        public async Task<SM_MODULES> ADD_MODULE(SM_MODULES model)
        {
            var tmp = await context.SM_MODULES.AddAsync(model);
            await context.SaveChangesAsync();
            return tmp.Entity;
        }

        public async Task<bool> EDIT_MODULE(SM_MODULES model)
        {
            var tmp = await context.SM_MODULES.FirstOrDefaultAsync(c=>c.ID == model.ID);
            if(tmp != null)
            {
                if(model.IS_DELETED == true)
                {
                    tmp.DELETED_AT = DateTime.Now;
                    tmp.IS_DELETED = true;
                    tmp.DELETED_BY = model.DELETED_BY;
                }else if(model.IS_UPDATED == true)
                {
                    tmp.NAME = model.NAME;
                    tmp.PATH = model.PATH;
                    tmp.ICON = model.ICON;
                    tmp.UPDATED_AT = DateTime.Now;
                    tmp.IS_UPDATED = true;
                    tmp.UPDATED_BY = model.UPDATED_BY;
                }
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
