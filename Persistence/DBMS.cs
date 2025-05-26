using cashmonkey.Models;

namespace cashmonkey.Controllers
{
    public class DBMS
    {
        public Dictionary<string, string> GestoriSicurezza { get; set; }
        public Dictionary<string, Utente> Utenti { get; set; }

        public DBMS()
        {
            GestoriSicurezza = new Dictionary<string, string>();
            GestoriSicurezza.Add("admin", "admin");

            Utenti = new Dictionary<string, Utente>();
            Utente matteo = new Utente("matteo", "matteopass", Valuta.EURO, 15300);
            Utenti.Add("matteo", matteo);
        }

        public string VerificaCredenziali(string username, string password)
        {
            if (GestoriSicurezza.ContainsKey(username)
                && GestoriSicurezza[username] == password) return "GestoreSicurezza";
            else if (Utenti.ContainsKey(username)
                && Utenti[username].Password == password) return "Utente";
            else return "error";
        }

        public void InsertUtente(Utente utente)
        {
            Utenti.Add(utente.Username, utente);
        }
    }
}