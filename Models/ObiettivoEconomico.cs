namespace cashmonkey.Models
{
    public class ObiettivoEconomico
    {
        public string Nome { get; set; }
        public float Importo { get; set; }
        public DateTime Termine { get; set; }
        public Utente Utente { get; set; }

        public ObiettivoEconomico(string nome, float importo, DateTime termine, Utente utente)
        {
            this.Nome = nome;
            this.Importo = importo;
            this.Termine = termine;
            this.Utente = utente;
        }

        public int CalcolaTempoRimanente()
        {
            return (Termine - DateTime.Today).Days;
        }
    }
}
