using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Views
{
    public class ViewFiltroMovimenti
    {
        private HomeGestioneMovimenti _homeGestioneMovimenti;
        private FiltroMovimentiController _filtroMovimentiController;

        public ViewFiltroMovimenti(
            HomeGestioneMovimenti homeGestioneMovimenti,
            FiltroMovimentiController filtroMovimentiController
        )
        {
            _homeGestioneMovimenti = homeGestioneMovimenti;
            _filtroMovimentiController = filtroMovimentiController;
        }

        public void EseguiFiltroMovimenti(
            DateTime dataIniziale,
            DateTime dataFinale,
            Categoria categoria,
            MetodoPagamento metodoPagamento,
            Valuta valuta
        )
        {
            StoricoMovimenti storicoMovimentiFiltrato =
                _filtroMovimentiController.FiltraMovimenti(
                    FiltroRichieste.Utente,
                    dataIniziale,
                    dataFinale,
                    categoria,
                    metodoPagamento,
                    valuta
                );

            _homeGestioneMovimenti.SetStoricoMovimenti(storicoMovimentiFiltrato);
            // TODO: show homeGestioneMovimenti
        }
    }
}
