using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class FiltroMovimentiController : Controller
    {
        public List<Movimento> FiltraMovimenti(
            Utente utente,
            DateTime dataIniziale,
            DateTime dataFinale,
            Categoria categoria,
            MetodoPagamento metodoPagamento,
            Valuta valuta
        )
        {
            List<Movimento> movimentiFiltrati = new List<Movimento>();

            DBMS dbConnection = getConnection();
            StoricoMovimenti storicoMovimenti = dbConnection.GetStoricoMovimenti(utente.Username);

            foreach (Movimento movimento in storicoMovimenti.Movimenti)
            {
                if (movimento.Data >= dataIniziale
                    && movimento.Data <= dataFinale
                    && movimento.Categoria == categoria
                    && movimento.MetodoPagamento == metodoPagamento
                    && movimento.Valuta == valuta)
                    movimentiFiltrati.Add(movimento);
            }

            return movimentiFiltrati;
        }
    }
}
