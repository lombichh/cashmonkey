using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class ViewRegistraMovimento
    {
        private HomeGestioneMovimenti _homeGestioneMovimenti;
        private GestioneMovimentiController _gestioneMovimentiController;

        public ViewRegistraMovimento(
            HomeGestioneMovimenti homeGestioneMovimenti,
            GestioneMovimentiController gestioneMovimentiController
        )
        {
            _homeGestioneMovimenti = homeGestioneMovimenti;
            _gestioneMovimentiController = gestioneMovimentiController;
        }

        public void EseguiRegistraMovimento(
            float importoOriginale,
            DateTime data,
            string descrizione,
            string id,
            MetodoPagamento metodoPagamento,
            Valuta valuta,
            Categoria categoria
        )
        {
            _gestioneMovimentiController.RegistraMovimento(
                FiltroRichieste.Utente,
                id,
                importoOriginale,
                data,
                descrizione,
                metodoPagamento,
                valuta,
                categoria
            );

            // TODO: show homeGestioneMovimenti
        }
    }
}
