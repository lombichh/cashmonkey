using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class Controller
    {
        public static DBMS dbConnection = new DBMS();

        public DBMS getConnection()
        {
            return dbConnection;
        }
    }
}
