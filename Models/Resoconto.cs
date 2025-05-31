namespace cashmonkey.Models
{
    public abstract class Resoconto
    {
        public StoricoMovimenti? EstrattoContoAttuale { get; set; }
        public StoricoMovimenti? EstrattoContoPrecedente { get; set; }
        public DateTime DataInizio { get; set; }
        public DateTime DataFine { get; set; }
        public string? Giudizio  { get; set; }

        protected Resoconto(DateTime dataInizio, DateTime dataFine)
        {
            this.EstrattoContoAttuale = null;
            this.EstrattoContoPrecedente = null;
            this.DataInizio = dataInizio;
            this.DataFine = dataFine;
            this.Giudizio = null;
        }
    }
}