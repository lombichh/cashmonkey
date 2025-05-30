using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestioneMetodiPagamentoController : Controller
    {

        public void OrdinaPerCategoria(Utente utente)
        {
            ElencoMetodiPagamento elencoMetodiPagamento = OttieniMetodiPagamento(utente);
            elencoMetodiPagamento.MetodiPagamento.OrderBy(metodoPagamento => metodoPagamento.Categoria).ToList();
            
            DBMS dbConnection = getConnection();
            dbConnection.SetMetodiPagamento(utente.Username, elencoMetodiPagamento);
        }

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
            dbConnection.RemoveMetodoPagamento(metodoPagamento, utente.Username);
        }

        public ElencoMetodiPagamento OttieniMetodiPagamento(Utente utente)
        {
            DBMS dbConnection = getConnection();
            return dbConnection.GetMetodiPagamento(utente.Username);
        }
    }
}
