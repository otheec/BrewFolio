using BrewFolioServer.Application.Interface;
using BrewFolioServer.Application.Service;
using BrewFolioServer.Application.Utility;
using BrewFolioServer.Infrastructure.Data;
using BrewFolioServer.Infrastructure.Interface;
using BrewFolioServer.Infrastructure.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Step 1: Add CORS Service http://localhost:5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());

    /*options.AddPolicy("AllowFrontendOrigin2",
       builder => builder.WithOrigins("http://192.168.16.107:3000")
                         .AllowAnyMethod()
                         .AllowAnyHeader()
                         .AllowCredentials());*/
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// all parameters added to test login, was empty before
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        //Description = "Please enter into field the word 'Bearer' following by space and JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// Configure EF Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BrewfolioDatabase2")));

builder.Services.AddDbContext<AppIdentityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BrewfolioDatabase2")));

// TODO - legit check - why??
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppIdentityDbContext>();

// Register repositories for dependency injection
builder.Services.AddScoped<IBreweryRepository, BreweryRepository>();
builder.Services.AddScoped<IBeerRepository, BeerRepository>();
builder.Services.AddScoped<IBreweryTypeRepository, BreweryTypeRepository>();
builder.Services.AddScoped<IBreweryStatusRepository, BreweryStatusRepository>();

// Register services for dependency injection
builder.Services.AddScoped<IBreweryService, BreweryService>();
builder.Services.AddScoped<IBeerService, BeerService>();
builder.Services.AddScoped<IBreweryTypeService, BreweryTypeService>();
builder.Services.AddScoped<IBreweryStatusService, BreweryStatusService>();

// Fetcher service
builder.Services.AddScoped<IFetcherCSVService, FetcherCSVService>();

// Fetcher test
builder.Services.AddSingleton<FetcherCSV>();

var app = builder.Build();

// Apply pending migrations and create the database if it does not exist
using (var scope = app.Services.CreateScope())
{
    //TODO ------------------------------------------------------------------------------------------
    var dbContext = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();
    //var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();

// Step 2: Use CORS Middleware
app.UseCors("AllowFrontendOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
