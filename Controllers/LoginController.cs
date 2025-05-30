using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class LoginController : Controller
    {
        public string VerificaCredenziali(string username, string password)
        {
            DBMS dbConnection = getConnection();
            string result = dbConnection.VerificaCredenziali(username, password);

            if (result == "utente") FiltroRichieste.Utente = dbConnection.GetUtente(username);

            return result;
        }
    }
}
