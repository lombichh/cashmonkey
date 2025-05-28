using cashmonkey.Models;

namespace cashmonkey.Controllers
{
    public class GestioneMovimentiController : Controller
    {
        private FiltroMovimentiController _filtroMovimentiController;
        private ConversioneImportoController _conversioneImportoController;

        public GestioneMovimentiController() {
            _filtroMovimentiController = new FiltroMovimentiController();
            _conversioneImportoController = new ConversioneImportoController();
        }

        public float CalcolaTotale(Utente utente)
        {
            float totale = 0;

            DBMS dbConnection = getConnection();
            StoricoMovimenti storicoMovimenti = dbConnection.GetStoricoMovimenti(utente.Username);

            foreach (Movimento movimento in storicoMovimenti.Movimenti)
            {
                totale += _conversioneImportoController.ConvertiImportoRiferimento(
                    utente,
                    movimento.ImportoOriginale,
                    movimento.Valuta
                );
            }

            return totale;
        }
    }
}
