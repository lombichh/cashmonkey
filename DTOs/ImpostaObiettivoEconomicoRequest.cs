using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class ImpostaObiettivoEconomicoRequest
    {
        public required string Nome { get; set; }
        public required float Importo { get; set; }
        public required DateTime Termine { get; set; }
    }
}
