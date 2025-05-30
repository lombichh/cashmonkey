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

        public void SetStoricoMovimenti(StoricoMovimenti storicoMovimenti)
        {
            _storicoMovimenti = storicoMovimenti;
        }

        public void MostraStoricoMovimenti()
        {
            // TODO: show storicoMovimenti
        }

        public void EseguiRegistraMovimento()
        {
            ViewRegistraMovimento viewRegistraMovimento =
                new ViewRegistraMovimento(this, _gestioneMovimentiController);

            // TODO: show viewRegistraMovimento
        }

        public void EseguiRimuoviMovimento(Movimento movimento)
        {
            ViewRimuoviMovimento viewRimuoviMovimento =
                new ViewRimuoviMovimento(this, _gestioneMovimentiController);
                
            // TODO: show viewRimuoviMovimento
        }

        public void EseguiFiltroMovimenti()
        {
            ViewFiltroMovimenti viewFiltroMovimenti =
                new ViewFiltroMovimenti(this, new FiltroMovimentiController());

            // TODO: show viewFiltroMovimenti
        }
    }
}
