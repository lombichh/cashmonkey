namespace cashmonkey.Models
{
    public class MetodoPagamento
    {
        public string Nome { get; set; }
        public CategoriaMetodoPagamento Categoria { get; set; }

        public MetodoPagamento(string nome, CategoriaMetodoPagamento categoria)
        {
            this.Nome = nome;
            this.Categoria = categoria;
        }
    }
}
