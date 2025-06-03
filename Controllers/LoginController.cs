using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class LoginController : Controller
    {
        private FiltroRichieste _filtroRichieste;

        public LoginController(FiltroRichieste filtroRichieste)
        {
            _filtroRichieste = filtroRichieste;
        }

        public string VerificaCredenziali(string username, string password)
        {
            DBMS dbConnection = getConnection();
            string result = dbConnection.VerificaCredenziali(username, password);

            if (result == "utente") _filtroRichieste.Utente = dbConnection.GetUtente(username);

            return result;
        }
    }
}
