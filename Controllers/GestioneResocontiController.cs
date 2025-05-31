using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestioneResocontiController : Controller
    {
        private ConversioneImportoController _conversioneImportoController;

        public GestioneResocontiController()
        {
            _conversioneImportoController = new ConversioneImportoController();
        }

        public void GeneraResocontoAnnuale(Utente utente)
        {
            DateTime dataInizio = new DateTime(DateTime.Now.Year - 1, 1, 1);
            DateTime dataFine = new DateTime(DateTime.Now.Year - 1, 12, 31);
            ResocontoMensile resocontoMensile = new ResocontoMensile(dataInizio, dataFine);
            generaEstrattoContoAttuale(utente, resocontoMensile);
            generaEstrattoContoPrecedente(utente, resocontoMensile);
            generaGiudizio(utente, resocontoMensile);
            return;
        }

        public void GeneraResocontoMensile(Utente utente)
        {
            DateTime dataInizio;
            DateTime dataFine;
            if (DateTime.Now.Month == 1)
            {
                dataInizio = new DateTime(DateTime.Now.Year - 1, 12, 1);
                dataFine = new DateTime(DateTime.Now.Year - 1, 12, 31);
            }
            else
            {
                dataInizio = new DateTime(DateTime.Now.Year, DateTime.Now.Month - 1, 1);
                dataFine = new DateTime(DateTime.Now.Year - 1, DateTime.Now.Month - 1, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month - 1));
            }
            ResocontoAnnuale resocontoAnnuale = new ResocontoAnnuale(dataInizio, dataFine);
            generaEstrattoContoAttuale(utente, resocontoAnnuale);
            generaEstrattoContoPrecedente(utente, resocontoAnnuale);
            generaGiudizio(utente, resocontoAnnuale);
            return;
        }

        public ResocontoAnnuale? OttieniResocontoAnnuale(Utente utente)
        {
            return dbConnection.GetResocontoAnnuale(utente.Username);
        }

        public ResocontoMensile? OttieniResocontoMensile(Utente utente)
        {
            return dbConnection.GetResocontoMensile(utente.Username);
        }

        private void generaGiudizio(Utente utente, Resoconto resoconto)
        {
            string giudizio;

            float totaleAttuale = 0;
            foreach (Movimento movimento in resoconto.EstrattoContoAttuale.Movimenti)
            {
                if (!utente.IsValutaRiferimento(movimento.Valuta))
                    totaleAttuale += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        movimento.ImportoOriginale,
                        movimento.Valuta
                    );
            }

            float totalePrecedente = 0;
            foreach (Movimento movimento in resoconto.EstrattoContoPrecedente.Movimenti)
            {
                if (!utente.IsValutaRiferimento(movimento.Valuta))
                    totalePrecedente += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        movimento.ImportoOriginale,
                        movimento.Valuta
                    );
            }
            
            float variazione = (totaleAttuale / totalePrecedente * 100) - 100;

            if (variazione <= -25)
                giudizio = "molto scarso";
            else if (variazione > -25 && variazione <= -10)
                giudizio = "scarso";
            else if (variazione > -10 && variazione < 10)
                giudizio = "neutro";
            else if (variazione >= 10 && variazione < 25)
                giudizio = "buono";
            else
                giudizio = "molto buono";

            resoconto.Giudizio = giudizio;
            return;
        }

        private void generaEstrattoContoAttuale(Utente utente, Resoconto resoconto)
        {
            List<Movimento> result = new List<Movimento>();
            foreach (Movimento m in utente.StoricoMovimenti.Movimenti)
                if (m.Data >= resoconto.DataInizio && m.Data <= resoconto.DataFine)
                    result.Add(m);
            resoconto.EstrattoContoAttuale = new StoricoMovimenti(result);
            return;
        }

        private void generaEstrattoContoPrecedente(Utente utente, Resoconto resoconto)
        {
            List<Movimento> result = new List<Movimento>();
            DateTime dataInizioPrec = resoconto.DataInizio.AddMonths(-1);
            DateTime dataFinePrec = resoconto.DataFine.AddMonths(-1);
            foreach (Movimento m in utente.StoricoMovimenti.Movimenti)
                if (m.Data >= dataInizioPrec && m.Data <= dataFinePrec)
                    result.Add(m);
            resoconto.EstrattoContoPrecedente = new StoricoMovimenti(result);
            return;
        }

    }
}