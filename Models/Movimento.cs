namespace cashmonkey.Models
{
    public class Movimento
    {
        public string Id { get; set; }
        public float ImportoOriginale { get; set; }
        public DateTime Data { get; set; }
        public string Descrizione { get; set; }
        public MetodoPagamento MetodoPagamento { get; set; }
        public Valuta Valuta { get; set; }
        public Categoria Categoria { get; set; }

        public Movimento(
            string id,
            float importoOriginale,
            DateTime data,
            string descrizione,
            MetodoPagamento metodoPagamento,
            Valuta valuta,
            Categoria categoria
        )
        {
            this.Id = id;
            this.ImportoOriginale = importoOriginale;
            this.Data = data;
            this.Descrizione = descrizione;
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
