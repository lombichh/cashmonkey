using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class HomeGestioneMovimenti
    {
        private GestioneMovimentiController _gestioneMovimentiController;

        public HomeGestioneMovimenti()
        {
            _gestioneMovimentiController = new GestioneMovimentiController();
        }

        public void mostraStoricoMovimenti()
        {
            StoricoMovimenti storicoMovimenti =
                _gestioneMovimentiController.OttieniMovimenti(FiltroRichieste.Utente);

            // TODO: show storicoMovimenti
        }

        public void eseguiRegistraMovimento(
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

            mostraStoricoMovimenti();
        }

        public void eseguiRimuoviMovimento(string id)
        {
            
        }
    }
}
