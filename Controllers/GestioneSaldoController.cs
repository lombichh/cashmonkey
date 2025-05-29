using cashmonkey.Models;

namespace cashmonkey.Controllers
{
    public class GestionesSaldoController : Controller
    {
        public float OttieniSaldoCorrente(Utente utente)
        {
            DBMS dbConnection = getConnection();
            Saldo saldo = dbConnection.GetSaldo(utente.Username);

            return saldo.GetValoreCorrente();
        }

        public float OttieniSaldoIniziale(Utente utente)
        {
            DBMS dbConnection = getConnection();
            Saldo saldo = dbConnection.GetSaldo(utente.Username);

            return saldo.ValoreIniziale;
        }
    }
}
