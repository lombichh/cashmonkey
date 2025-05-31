using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class FiltraMovimentiRequest
    {
        public required DateTime DataIniziale { get; set; }
        public required DateTime DataFinale { get; set; }
        public required Categoria Categoria { get; set; }
        public required MetodoPagamento MetodoPagamento { get; set; }
        public required Valuta Valuta { get; set; }
    }
}
