using cashmonkey.Controllers;
using cashmonkey.Models;

namespace cashmonkey.Views
{
    public class ViewRegistrazione
    {
        private RegistrazioneController _registrazioneController;

        public ViewRegistrazione()
        {
            _registrazioneController = new RegistrazioneController();
        }

        public void EseguiRegistrazione(
            string username,
            string password,
            Valuta valutaRiferimento,
            float saldoIniziale
        )
        {
            _registrazioneController.RegistraUtente(
                username,
                password,
                valutaRiferimento,
                saldoIniziale
            );

            ViewLogin viewLogin = new ViewLogin();
            // TODO: show viewLogin
        }
    }
}
