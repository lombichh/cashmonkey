using cashmonkey.Controllers;

namespace cashmonkey.Views
{
    public class ViewLogin
    {
        private LoginController _loginController;

        public ViewLogin()
        {
            _loginController = new LoginController();
        }

        public void eseguiVerificaCredenziali(string username, string password)
        {
            string result = _loginController.VerificaCredenziali(username, password);

            if (result == "Utente")
            {
                // TODO: show HomeGestioneMovimenti
            }
            else if (result == "GestoreSicurezza")
            {
                // TODO: show HomeGestoreSicurezza
            }
        }
    }
}
