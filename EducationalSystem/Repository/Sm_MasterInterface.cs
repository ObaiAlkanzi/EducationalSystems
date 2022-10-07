
using StudentLibrary.SM_CLASSES;

namespace EducationalSystem.Repository
{
    public interface Sm_MasterInterface
    {
        Task<SM_MODULES> ADD_MODULE(SM_MODULES model);
        Task<bool> EDIT_MODULE(SM_MODULES model);
    }
}
