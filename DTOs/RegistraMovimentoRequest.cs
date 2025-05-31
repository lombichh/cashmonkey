using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class RegistraMovimentoRequest
    {
        public Utente Utente { get; set; }
        public string Id { get; set; }
        public float ImportoOriginale { get; set; }
        public DateTime Data { get; set; }
        public string Descrizione { get; set; }
        public MetodoPagamento MetodoPagamento { get; set; }
        public Valuta Valuta { get; set; }
        public Categoria Categoria { get; set; }
    }
}
