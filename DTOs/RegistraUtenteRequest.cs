using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class RegistraUtenteRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required Valuta ValutaRiferimento { get; set; }
        public required float SaldoIniziale { get; set; }
    }
}
