using cashmonkey.Models;

namespace cashmonkey.Controllers
{
    public class GestioneObiettivoEconomicoController : Controller
    {
        public float CalcolaSaldoMancante(Utente utente)
        {
            ObiettivoEconomico? obiettivoEconomico = OttieniObiettivoEconomico(utente);

            if (obiettivoEconomico != null) return obiettivoEconomico.CalcolaSaldoMancante();
            else return -1;
        }

        public int CalcolaTempoRimanente(Utente utente)
        {
            ObiettivoEconomico? obiettivoEconomico = OttieniObiettivoEconomico(utente);

            if (obiettivoEconomico != null) return obiettivoEconomico.CalcolaTempoRimanente();
            else return -1;
        }

        public void ImpostaObiettivoEconomico(
            Utente utente,
            string nome,
            float importo,
            DateTime termine
        )
        {
            ObiettivoEconomico obiettivoEconomico = new ObiettivoEconomico(
                nome,
                importo,
                termine,
                utente
            );

            DBMS dbConnection = getConnection();
            dbConnection.InsertObiettivoEconomico(obiettivoEconomico, utente.Username);
        }

        public void CancellaObiettivoEconomico(Utente utente)
        {
            DBMS dbConnection = getConnection();
            dbConnection.RemoveObiettivoEconomico(utente.Username);
        }

        public ObiettivoEconomico? OttieniObiettivoEconomico(Utente utente)
        {
            DBMS dbConnection = getConnection();
            return dbConnection.GetObiettivoEconomico(utente.Username);
        }
    }
}
