using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentLibrary.SM_CLASSES;
using StudentLibrary.STUDENT;

namespace EducationalSystem.Models
{
    public class AppDbContext:IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            :base(options)
        {

        }

        public DbSet<SM_STUDENT> SM_STUDENT { get; set; }
        public DbSet<SM_MODULES> SM_MODULES { get; set; }
    }
}
