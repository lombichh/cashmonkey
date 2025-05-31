using Microsoft.AspNetCore.Mvc;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class Controller : ControllerBase
    {
        public static DBMS dbConnection = new DBMS();

        public DBMS getConnection()
        {
            return dbConnection;
        }
    }
}