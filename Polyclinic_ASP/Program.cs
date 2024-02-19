using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using BLL;
using BLL.Services;
using Domain.DomainModels;
using Infrastructure;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<PolyclinicKurContext>();
builder.Services.AddTransient<IDbRepository, DbRepositorySQL>();
builder.Services.AddTransient<IDbCrud, DbDataOperations>();
builder.Services.AddTransient<IDoctorService, DoctorService>();
builder.Services.AddTransient<IPatientService, PatientService>();
builder.Services.AddTransient<IVisitService, VisitService>();

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
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
