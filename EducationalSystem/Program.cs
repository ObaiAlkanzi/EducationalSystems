using EducationalSystem.Hubs;
using EducationalSystem.Models;
using EducationalSystem.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("StudentDbConnection")));
builder.Services.AddScoped<Sm_MasterInterface, Sm_MasterRepository>();

builder.Services.AddMvc().AddNewtonsoftJson(opt => {
    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddIdentity<IdentityUser,IdentityRole>();
builder.Services.AddSignalR();
builder.Services.AddAuthentication().AddGoogle(options => {
    options.ClientId = "195000425277-fa2q397v6s79c4qpvso8dgmnb71b3k5r.apps.googleusercontent.com";
    options.ClientSecret = "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";
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");
app.UseEndpoints(endpointes =>
{
    endpointes.MapHub<FirstHub>("/firsthub");
    endpointes.MapHub<ModulesHub>("/moduleshub");
});
app.Run();
