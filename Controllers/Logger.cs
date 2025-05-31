using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class Logger : Controller
    {

        // l'implementazione della classe è più semplice di quella reale --> per semplicità
        // non usiamo un file ma una classe come mock
        
        public void printOperazioneAutomatica(DateTime timestamp, string operazione, string evento)
        {
            VoceLogOperazioneAutomatica entry = new VoceLogOperazioneAutomatica(timestamp, operazione, evento);
            FileLog.VociLog.AggiungiVoceLog(entry);
            return;
        }

        public void printOperazioneManuale(DateTime timestamp, string operazione, string utente)
        {
            VoceLogOperazioneManuale entry = new VoceLogOperazioneManuale(timestamp, operazione, utente);
            FileLog.VociLog.AggiungiVoceLog(entry);
            return;
        }

    }
}