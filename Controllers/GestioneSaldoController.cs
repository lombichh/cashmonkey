using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class GestioneSaldoController : Controller
    {
        private ConversioneImportoController _conversioneImportoController;

        public GestioneSaldoController()
        {
            _conversioneImportoController = new ConversioneImportoController();
        }

        public float OttieniSaldoCorrente(Utente utente)
        {
            DBMS dbConnection = getConnection();

            float saldoCorrente = 0;

            foreach (Movimento movimento in dbConnection.GetStoricoMovimenti(utente.Username).Movimenti)
            {
                if (!utente.IsValutaRiferimento(movimento.Valuta))
                    saldoCorrente += _conversioneImportoController.ConvertiImportoRiferimento(
                        utente,
                        movimento.ImportoOriginale,
                        movimento.Valuta
                    );
            }

            saldoCorrente -= OttieniSaldoIniziale(utente);

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
