using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class AggiungiPromemoriaRequest
    {
        public string Nome { get; set; }
        public float Importo { get; set; }
        public DateTime Scadenza { get; set; }
        public string Descrizione { get; set; }
        public Valuta Valuta { get; set; }
        public Categoria Categoria { get; set; }
    }
}
