using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class LogController : Controller
    {

        public Log OttieniVociLog(DateTime inizio, DateTime fine)
        {
            return FileLog.VociLog.OttieniVociLog(inizio, fine);
        }

        public Log OttieniVociLogOperazioniAutomatiche()
        {
            return FileLog.VociLog.OttieniVociLogOperazioniAutomatiche();
        }

        public Log OttieniVociLogOperazioniManuali()
        {
            return FileLog.VociLog.OttieniVociLogOperazioniManuali();
        }

    }
}