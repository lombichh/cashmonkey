using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class HomeGestioneMetodiPagamenti
    {
        private GestioneMetodiPagamentoController _gestioneMetodiPagamentoController;

        public HomeGestioneMetodiPagamenti()
        {
            _gestioneMetodiPagamentoController = new GestioneMetodiPagamentoController();
        }

        public void MostraElencoMetodiPagamento()
        {
            ElencoMetodiPagamento elencoMetodiPagamento =
                _gestioneMetodiPagamentoController.OttieniMetodiPagamento(FiltroRichieste.Utente);

            // TODO: show elencoMetodiPagamento
        }

        public void EseguiAggiungiMetodoPagamento()
        {
            ViewAggiungiMetodoPagamento viewAggiungiMetodoPagamento =
                new ViewAggiungiMetodoPagamento(this, _gestioneMetodiPagamentoController);

            // TODO: show viewAggiungiMetodoPagamento
        }

        public void EseguiRimuoviMovimento(Movimento movimento)
        {
            ViewRimuoviMetodoPagamento viewRimuoviMetodoPagamento =
                new ViewRimuoviMetodoPagamento(this, _gestioneMetodiPagamentoController);
                
            // TODO: show viewRimuoviMetodoPagamento
        }
    }
}
