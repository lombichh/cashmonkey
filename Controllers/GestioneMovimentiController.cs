using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestioneMovimentiController : Controller
    {
        private FiltroMovimentiController _filtroMovimentiController;
        private ConversioneImportoController _conversioneImportoController;

        public GestioneMovimentiController()
        {
            _filtroMovimentiController = new FiltroMovimentiController();
            _conversioneImportoController = new ConversioneImportoController();
        }

        public float CalcolaTotale(Utente utente)
        {
            float totale = 0;

            StoricoMovimenti storicoMovimenti = OttieniMovimenti(utente);
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

        public float CalcolaTotaleEntrate(Utente utente)
        {
            float totaleEntrate = 0;

            StoricoMovimenti storicoMovimenti = OttieniMovimenti(utente);
            foreach (Movimento movimento in storicoMovimenti.Movimenti) {
                if (movimento.IsEntrata())
                    totaleEntrate += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        movimento.ImportoOriginale,
                        movimento.Valuta
                    );
            }

            return totaleEntrate;
        }

        public float CalcolaTotaleUscite(Utente utente)
        {
            float totaleEntrate = 0;

            StoricoMovimenti storicoMovimenti = OttieniMovimenti(utente);
            foreach (Movimento movimento in storicoMovimenti.Movimenti)
            {
                if (movimento.IsUscita())
                    totaleEntrate += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        movimento.ImportoOriginale,
                        movimento.Valuta
                    );
            }

            return totaleEntrate;
        }

        public bool IsEntrata(Movimento movimento)
        {
            return movimento.IsEntrata();
        }

        public bool IsUscita(Movimento movimento)
        {
            return movimento.IsUscita();
        }

        public void RegistraMovimento(
            Utente utente,
            string id,
            float importoOriginale,
            DateTime data,
            string descrizione,
            MetodoPagamento metodoPagamento,
            Valuta valuta,
            Categoria categoria
        )
        {
            Movimento movimento = new Movimento(
                id,
                importoOriginale,
                data,
                descrizione,
                metodoPagamento,
                valuta,
                categoria
            );

            DBMS dbConnection = getConnection();
            dbConnection.InsertMovimento(movimento, utente.Username);
        }

        public void RimuoviMovimento(Utente utente, Movimento movimento)
        {
            DBMS dbConnection = getConnection();
            dbConnection.RemoveMovimento(movimento.Id, utente.Username);
        }

        public StoricoMovimenti OttieniMovimenti(Utente utente)
        {
            DBMS dbConnection = getConnection();
            StoricoMovimenti storicoMovimenti =
                dbConnection.GetStoricoMovimenti(utente.Username);

            storicoMovimenti.OrdinaPerData();

            return storicoMovimenti;
        }
    }
}
