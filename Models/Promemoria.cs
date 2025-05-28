namespace cashmonkey.Models
{
    public class Promemoria
    {
        public string Nome { get; set; }
        public float Importo { get; set; }
        public DateTime Scadenza { get; set; }
        public string Descrizione { get; set; }
        public Valuta Valuta { get; set; }
        public Categoria Categoria { get; set; }

        public Promemoria(
            string nome,
            float importo,
            DateTime scadenza,
            string descrizione,
            Valuta valuta,
            Categoria categoria
        )
        {
            this.Nome = nome;
            this.Importo = importo;
            this.Scadenza = scadenza;
            this.Descrizione = descrizione;
            this.Valuta = valuta;
            this.Categoria = categoria;
        }
    }
}
