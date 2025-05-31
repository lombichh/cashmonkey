using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class RegistraUtenteRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public Valuta ValutaRiferimento { get; set; }
        public float SaldoIniziale { get; set; }
    }
}
