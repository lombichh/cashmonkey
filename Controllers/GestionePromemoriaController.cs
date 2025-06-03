using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestionePromemoriaController : Controller
    {
        private ConversioneImportoController _conversioneImportoController;

        public GestionePromemoriaController()
        {
            _conversioneImportoController = new ConversioneImportoController();
        }

        public float CalcolaTotaleImporti(Utente utente)
        {
            float totaleImporti = 0;

            List<Promemoria> promemoria = OttieniPromemoria(utente).Promemoria;
            foreach (Promemoria p in promemoria)
            {
                if (!utente.IsValutaRiferimento(p.Valuta))
                    totaleImporti += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        p.Importo,
                        p.Valuta
                    );
            }

            return totaleImporti;
        }

        public void AggiungiPromemoria(
            Utente utente,
            string nome,
            float importo,
            DateTime scadenza,
            string descrizione,
            Valuta valuta,
            Categoria categoria
        )
        {
            Promemoria promemoria = new Promemoria(
                nome,
                importo,
                scadenza,
                descrizione,
                valuta,
                categoria
            );

            DBMS dbConnection = getConnection();
            dbConnection.InsertPromemoria(promemoria, utente.Username);
        }

        public void RimuoviPromemoria(Utente utente, Promemoria promemoria)
        {
            DBMS dbConnection = getConnection();
            dbConnection.RemovePromemoria(promemoria.Nome, utente.Username);
        }

        public ElencoPromemoria OttieniPromemoria(Utente utente)
        {
            DBMS dbConnection = getConnection();
            ElencoPromemoria elencoPromemoria = dbConnection.GetPromemoria(utente.Username);

            elencoPromemoria.OrdinaPerScadenza();

            return elencoPromemoria;
        }
    }
}
