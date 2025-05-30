using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class HomeGestioneMovimenti
    {
        private GestioneMovimentiController _gestioneMovimentiController;
        private StoricoMovimenti _storicoMovimenti;

        public HomeGestioneMovimenti()
        {
            _gestioneMovimentiController = new GestioneMovimentiController();
            _storicoMovimenti =
                _gestioneMovimentiController.OttieniMovimenti(FiltroRichieste.Utente);
        }

        public void setStoricoMovimenti(StoricoMovimenti storicoMovimenti)
        {
            _storicoMovimenti = storicoMovimenti;
        }

        public void mostraStoricoMovimenti()
        {
            // TODO: show storicoMovimenti
        }

        public void eseguiRegistraMovimento()
        {
            ViewRegistraMovimento viewRegistraMovimento =
                new ViewRegistraMovimento(this, _gestioneMovimentiController);

            // TODO: show viewRegistraMovimento
        }

        public void eseguiRimuoviMovimento(Movimento movimento)
        {
            ViewRimuoviMovimento viewRimuoviMovimento =
                new ViewRimuoviMovimento(this, _gestioneMovimentiController);
                
            // TODO: show viewRimuoviMovimento
        }

        public void eseguiFiltroMovimenti()
        {
            ViewFiltroMovimenti viewFiltroMovimenti =
                new ViewFiltroMovimenti(this, new FiltroMovimentiController());

            // TODO: show viewFiltroMovimenti
        }
    }
}
