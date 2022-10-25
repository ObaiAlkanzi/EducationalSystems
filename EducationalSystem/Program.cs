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
builder.Services.AddIdentity<IdentityUser,IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
builder.Services.AddScoped<Sm_MasterInterface, Sm_MasterRepository>();

builder.Services.AddMvc().AddNewtonsoftJson(opt => {
    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddSignalR();
builder.Services.AddAuthentication().AddGoogle(options => {
    options.ClientId = "92216191318-11mui5dofi953geufs7snotih846s596.apps.googleusercontent.com";
    options.ClientSecret = "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";
    //options.CallbackPath = "";
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
