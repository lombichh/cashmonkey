using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestioneMetodiPagamentoController : Controller
    {
        public void AggiungiMetodoPagamento(
            Utente utente,
            string nome,
            CategoriaMetodoPagamento categoria
        )
        {
            MetodoPagamento metodoPagamento = new MetodoPagamento(
                nome,
                categoria
            );

            DBMS dbConnection = getConnection();
            dbConnection.InsertMetodoPagamento(metodoPagamento, utente.Username);
        }

        public void RimuoviMetodoPagamento(
            Utente utente,
            MetodoPagamento metodoPagamento
        )
        {
            DBMS dbConnection = getConnection();
            dbConnection.RemoveMetodoPagamento(metodoPagamento.Nome, utente.Username);
        }

        public ElencoMetodiPagamento OttieniMetodiPagamento(Utente utente)
        {
            DBMS dbConnection = getConnection();
            ElencoMetodiPagamento elencoMetodiPagamento =
                dbConnection.GetMetodiPagamento(utente.Username);
            
            elencoMetodiPagamento.OrdinaPerCategoria();

            return elencoMetodiPagamento;
        }
    }
}
