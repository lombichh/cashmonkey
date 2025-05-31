using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

class Program
{
    static void Main(string[] args)
    {
        FiltroRichieste filtroRichieste = new FiltroRichieste();
        LoginController loginController = new LoginController(filtroRichieste);

        loginController.VerificaCredenziali("matteo", "matteopass")

        Console.WriteLine();
    }
}
