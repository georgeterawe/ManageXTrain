using ModularApp.Core.Configurations;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Repositories;
using ModularApp.Modules.Users.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Bind MongoDB settings
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings")
);

// Register MongoDB client
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

// Register database
builder.Services.AddSingleton(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

// Register UserRepository and UserService
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Add controllers
builder.Services.AddControllers();

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddSwaggerGen(options =>
// {
//     options.SwaggerDoc("v1", new OpenApiInfo
//     {
//         Title = "ModularApp API",
//         Version = "v1",
//         Description = "API documentation for ModularApp project"
//     });
// });

var app = builder.Build();

// Enable Swagger middleware (for documentation)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Generates the Swagger JSON
    app.UseSwaggerUI();
//     app.UseSwagger(); // Generates the Swagger JSON
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "ModularApp API V1");
//         c.RoutePrefix = string.Empty; // Makes Swagger UI available at the root (optional)
//     });
}

// Middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Example endpoint to test MongoDB connection
app.MapGet("/test-mongo", async (IMongoDatabase database) =>
{
    try
    {
        var collections = await database.ListCollectionNamesAsync();
        return Results.Ok(await collections.ToListAsync());
    }
    catch (Exception ex)
    {
        return Results.Problem("Could not connect to MongoDB: " + ex.Message);
    }
});

// Run the app
app.Run();
// using ModularApp.Core.Configurations;
// using Microsoft.Extensions.Options;
// using MongoDB.Driver;
// using Microsoft.OpenApi.Models;

// var builder = WebApplication.CreateBuilder(args);

// // Bind MongoDB settings
// builder.Services.Configure<MongoDbSettings>(
//     builder.Configuration.GetSection("MongoDbSettings")
// );

// // Register MongoDB client
// builder.Services.AddSingleton<IMongoClient>(sp =>
// {
//     var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
//     return new MongoClient(settings.ConnectionString);
// });

// // Register database
// builder.Services.AddSingleton(sp =>
// {
//     var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
//     var client = sp.GetRequiredService<IMongoClient>();
//     return client.GetDatabase(settings.DatabaseName);
// });

// builder.Services.AddControllers();// Add controllers

// // Add services to the container (including Swagger)
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // builder.Services.AddSwaggerGen(options =>
// // {
// //     options.SwaggerDoc("v1", new OpenApiInfo
// //     {
// //         Title = "ModularApp API",
// //         Version = "v1",
// //         Description = "API documentation for ModularApp project"
// //     });
// // });

// var app = builder.Build();

// // Enable Swagger middleware (for documentation)
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger(); // Generates the Swagger JSON
//     app.UseSwaggerUI();
//     // app.UseSwaggerUI(c =>
//     // {
//     //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "ModularApp API V1");
//     //     c.RoutePrefix = string.Empty; // Makes Swagger UI available at the root (optional)
//     // });
// }
// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();

// // Example endpoint to test MongoDB connection
// app.MapGet("/test-mongo", async (IMongoDatabase database) =>
// {
//     try
//     {
//         var collections = await database.ListCollectionNamesAsync();
//         return Results.Ok(await collections.ToListAsync());
//     }
//     catch (Exception ex)
//     {
//         return Results.Problem("Could not connect to MongoDB: " + ex.Message);
//     }
// });

// // Run the app
// app.Run();



// // ********main
// using ModularApp.Core.Configurations;
// using Microsoft.Extensions.Options;
// using MongoDB.Driver;

// var builder = WebApplication.CreateBuilder(args);

// // Bind MongoDB settings
// builder.Services.Configure<MongoDbSettings>(
//     builder.Configuration.GetSection("MongoDbSettings")
// );

// // Register MongoDB client
// builder.Services.AddSingleton<IMongoClient>(sp =>
// {
//     var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
//     return new MongoClient(settings.ConnectionString);
// });

// // Register database
// builder.Services.AddSingleton(sp =>
// {
//     var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
//     var client = sp.GetRequiredService<IMongoClient>();
//     return client.GetDatabase(settings.DatabaseName);
// });

// var app = builder.Build();
// app.MapGet("/test-mongo", async (IMongoDatabase database) =>
// {
//     try
//     {
//         var collections = await database.ListCollectionNamesAsync();
//         return Results.Ok(await collections.ToListAsync());
//     }
//     catch (Exception ex)
//     {
//         return Results.Problem("Could not connect to MongoDB: " + ex.Message);
//     }
// });

// app.Run();

// ************************First


// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
