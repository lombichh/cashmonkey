namespace cashmonkey.Models
{
    public class ElencoMetodiPagamento
    {
        public List<MetodoPagamento> MetodiPagamento { get; set; }

        public ElencoMetodiPagamento()
        {
            this.MetodiPagamento = [];
        }

        public void OrdinaPerCategoria()
        {
            MetodiPagamento = MetodiPagamento.OrderBy(metodoPagamento => metodoPagamento.Categoria).ToList();
        }
    }
}
