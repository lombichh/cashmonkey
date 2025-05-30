using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class RegistrazioneController : Controller
    {
        public void RegistraUtente(
            string username,
            string password,
            Valuta valutaRiferimento,
            float saldoIniziale
        )
        {
            Utente utente = new Utente(username, password, valutaRiferimento, saldoIniziale);
            DBMS dbConnection = getConnection();
            dbConnection.InsertUtente(utente);
        }
    }
}
