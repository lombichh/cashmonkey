using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class AggiungiPromemoriaRequest
    {
        public required string Nome { get; set; }
        public required float Importo { get; set; }
        public required DateTime Scadenza { get; set; }
        public required string Descrizione { get; set; }
        public required Valuta Valuta { get; set; }
        public required Categoria Categoria { get; set; }
    }
}
