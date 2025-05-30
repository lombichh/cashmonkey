using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class ViewRimuoviMetodoPagamento
    {
        private HomeGestioneMetodiPagamenti _homeGestioneMetodiPagamento;
        private GestioneMetodiPagamentoController _gestioneMetodiPagamentoController;

        public ViewRimuoviMetodoPagamento(
            HomeGestioneMetodiPagamenti homeGestioneMetodiPagamento,
            GestioneMetodiPagamentoController gestioneMetodiPagamentoController
        )
        {
            _homeGestioneMetodiPagamento = homeGestioneMetodiPagamento;
            _gestioneMetodiPagamentoController = gestioneMetodiPagamentoController;
        }

        public void EseguiRimuoviMetodoPagamento(MetodoPagamento metodoPagamento)
        {
            _gestioneMetodiPagamentoController.RimuoviMetodoPagamento(
                FiltroRichieste.Utente,
                metodoPagamento
            );

            // TODO: show homeGestioneMetodiPagamento
        }
    }
}
