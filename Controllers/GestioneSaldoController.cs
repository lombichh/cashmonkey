using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestionesSaldoController : Controller
    {
        private ConversioneImportoController _conversioneImportoController;

        public GestionesSaldoController()
        {
            _conversioneImportoController = new ConversioneImportoController();
        }

        public float OttieniSaldoCorrente(Utente utente)
        {
            DBMS dbConnection = getConnection();
            Saldo saldo = dbConnection.GetSaldo(utente.Username);

            float saldoCorrente = 0;

            foreach (Movimento movimento in utente.StoricoMovimenti.Movimenti)
            {
                saldoCorrente += _conversioneImportoController.ConvertiImportoRiferimento(
                    utente,
                    movimento.ImportoOriginale,
                    movimento.Valuta
                );
            }

            return saldoCorrente;
        }

        public float OttieniSaldoIniziale(Utente utente)
        {
            DBMS dbConnection = getConnection();
            Saldo saldo = dbConnection.GetSaldo(utente.Username);

            return saldo.ValoreIniziale;
        }
    }
}
