using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class LogController : Controller
    {

        public Log ottieniVociLog(DateTime inizio, DateTime fine)
        {
            return FileLog.VociLog.OttieniVociLog(inizio, fine);
        }

        public Log ottieniVociLogOperazioniAutomatiche()
        {
            return FileLog.VociLog.OttieniVociLogOperazioniAutomatiche();
        }

        public Log ottieniVociLogOperazioniManuali()
        {
            return FileLog.VociLog.OttieniVociLogOperazioniManuali();
        }

    }
}