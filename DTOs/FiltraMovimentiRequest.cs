using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class FiltraMovimentiRequest
    {
        public Utente Utente { get; set; }
        public DateTime DataIniziale { get; set; }
        public DateTime DataFinale { get; set; }
        public Categoria Categoria { get; set; }
        public MetodoPagamento MetodoPagamento { get; set; }
        public Valuta Valuta { get; set; }
    }
}
