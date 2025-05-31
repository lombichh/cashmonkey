using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class ViewAggiungiMetodoPagamento
    {
        private HomeGestioneMetodiPagamenti _homeGestioneMetodiPagamento;
        private GestioneMetodiPagamentoController _gestioneMetodiPagamentoController;

        public ViewAggiungiMetodoPagamento(
            HomeGestioneMetodiPagamenti homeGestioneMetodiPagamento,
            GestioneMetodiPagamentoController gestioneMetodiPagamentoController
        )
        {
            _homeGestioneMetodiPagamento = homeGestioneMetodiPagamento;
            _gestioneMetodiPagamentoController = gestioneMetodiPagamentoController;
        }

        public void EseguiAggiungiMetodoPagamento(
            string nome,
            CategoriaMetodoPagamento categoria
        )
        {
            _gestioneMetodiPagamentoController.AggiungiMetodoPagamento(
                FiltroRichieste.Utente,
                nome,
                categoria
            );

            // TODO: show homeGestioneMetodiPagamento
        }
    }
}
