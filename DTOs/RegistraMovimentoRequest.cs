using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class RegistraMovimentoRequest
    {
        public required string Id { get; set; }
        public required float ImportoOriginale { get; set; }
        public required DateTime Data { get; set; }
        public required string Descrizione { get; set; }
        public required MetodoPagamento MetodoPagamento { get; set; }
        public required Valuta Valuta { get; set; }
        public required Categoria Categoria { get; set; }
    }
}
