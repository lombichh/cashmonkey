using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class AggiungiMetodoPagamentoRequest
    {
        public required string Nome { get; set; }
        public required CategoriaMetodoPagamento Categoria { get; set; }
    }
}
