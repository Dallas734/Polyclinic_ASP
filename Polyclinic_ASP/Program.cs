using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using BLL;
using BLL.Services;
using Domain.DomainModels;
using Infrastructure;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using WebAPI.Data;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Add services to the container.
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<PolyclinicKurContext>();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();

builder.Services.AddDbContext<PolyclinicKurContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Polyclinic_ASP")));
builder.Services.AddTransient<IDbRepository, DbRepositorySQL>();
builder.Services.AddTransient<IDbCrud, DbDataOperations>();
builder.Services.AddTransient<IDoctorService, DoctorService>();
builder.Services.AddTransient<IPatientService, PatientService>();
builder.Services.AddTransient<IVisitService, VisitService>();
builder.Services.AddTransient<ISheduleService, SheduleService>();

/*string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PolyclinicKurContext>(options => options.UseSqlServer(connection));
*/
builder.Services.AddControllers().ConfigureApiBehaviorOptions(opt =>
{
    // Отключение автоматической генерации отклика HTTP 400
    opt.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddCors((options) =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://http://localhost:3000/")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "PolyclinicCookie";
    options.LoginPath = "/";
    options.AccessDeniedPath = "/";
    options.LogoutPath = "/";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var PolyclinicKurContext = scope.ServiceProvider.GetRequiredService<PolyclinicKurContext>();
    await PolyclinicContextSeed.SeedAsync(PolyclinicKurContext);
    await IdentitySeed.CreateUserRoles(scope.ServiceProvider);
}

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

app.UseHttpsRedirection();

/*app.MapIdentityApi<User>();

app.MapPost("/logout", async (SignInManager<User> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();

}).RequireAuthorization();*/

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
