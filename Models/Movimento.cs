namespace cashmonkey.Models
{
    public class Movimento
    {
        public float ImportoOriginale { get; set; }
        public DateTime Data { get; set; }
        public string Descrizione { get; set; }
        public string Id { get; set; }
        public MetodoPagamento MetodoPagamento { get; set; }
        public Valuta Valuta { get; set; }
        public Categoria Categoria { get; set; }

        public Movimento(
            float importoOriginale,
            DateTime data,
            string descrizione,
            string id,
            MetodoPagamento metodoPagamento,
            Valuta valuta,
            Categoria categoria
        )
        {
            this.ImportoOriginale = importoOriginale;
            this.Data = data;
            this.Descrizione = descrizione;
            this.Id = id;
            this.MetodoPagamento = metodoPagamento;
            this.Valuta = valuta;
            this.Categoria = categoria;
        }

        public bool IsEntrata()
        {
            return ImportoOriginale > 0;
        }

        public bool IsUscita()
        {
            return ImportoOriginale < 0;
        }

    }
}
