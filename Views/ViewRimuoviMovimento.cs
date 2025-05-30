using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class ViewRimuoviMovimento
    {
        private HomeGestioneMovimenti _homeGestioneMovimenti;
        private GestioneMovimentiController _gestioneMovimentiController;

        public ViewRimuoviMovimento(
            HomeGestioneMovimenti homeGestioneMovimenti,
            GestioneMovimentiController gestioneMovimentiController
        )
        {
            _homeGestioneMovimenti = homeGestioneMovimenti;
            _gestioneMovimentiController = gestioneMovimentiController;
        }

        public void eseguiRimuoviMovimento(Movimento movimento)
        {
            _gestioneMovimentiController.RimuoviMovimento(FiltroRichieste.Utente, movimento);

            // TODO: show homeGestioneMovimenti
        }
    }
}
