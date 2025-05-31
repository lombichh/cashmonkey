using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class AggiungiMetodoPagamentoRequest
    {
        public string Nome { get; set; }
        public CategoriaMetodoPagamento Categoria { get; set; }
    }
}
