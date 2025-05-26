namespace cashmonkey.Controllers
{
    using cashmonkey.Models;

    public class DBMS
    {
        public List<string> GestoriSicurezza { get; set; }
        public Dictionary<string, Utente> Utenti { get; set; }

        public DBMS()
        {
            GestoriSicurezza = new List<string>();
            GestoriSicurezza.Add("admin");

            Utenti = new Dictionary<string, Utente>();
            Utente matteo = new Utente("matteo", 15300, Valuta.EURO);
            Utenti.Add("matteo", matteo);
        }

        public string VerificaCredenziali(string username, string password)
        {
            if (GestoriSicurezza.Contains(username)) return "GestoreSicurezza";
            else if (Utenti.ContainsKey(username)) return "Utente";
            else return "error";
        }
    }
}