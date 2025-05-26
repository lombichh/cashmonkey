namespace cashmonkey.Controllers
{
    public class LoginController : Controller
    {
        public string VerificaCredenziali(string username, string password)
        {
            DBMS dbConnection = getConnection();
            return dbConnection.VerificaCredenziali(username, password);
        }
    }
}
