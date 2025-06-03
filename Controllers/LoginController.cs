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
            return dbConnection.VerificaCredenziali(username, password);
        }
    }
}
