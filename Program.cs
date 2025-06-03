using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using cashmonkey.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Registra i controller
builder.Services.AddControllers();

// Registra la classi con tempo di vita globale
builder.Services.AddSingleton<DBMS>();

// Registra la cache e il supporto per la sessione
builder.Services.AddDistributedMemoryCache(); // In-memory session storage
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // durata della sessione
    options.Cookie.HttpOnly = true; // sicurezza: accessibile solo dal server
    options.Cookie.IsEssential = true; // obbligatorio per il funzionamento
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// Middleware per frontend statico (Vite buildato)
app.UseDefaultFiles(); // cerca index.html
app.UseStaticFiles();  // serve contenuti da wwwroot/

app.UseRouting();
app.UseSession();

// Abilita gli endpoint dei controller
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    // Catch-all for React Router
    endpoints.MapFallbackToFile("index.html");
});

// Avvia l'app
app.Run();