using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class SbloccoUtenteController : Controller
    {

        public void SbloccaUtente(string username)
        {
            dbConnection.GetUtente(username).Bloccato = false;
            return;
        }

        public List<string> ottieniUtentiBloccati()
        {
            return dbConnection.GetUtentiBloccati();
        }

    }
}