namespace cashmonkey.Models
{
    public class ElencoPromemoria
    {
        public List<Promemoria> Promemoria { get; set; }

        public ElencoPromemoria()
        {
            this.Promemoria = [];
        }

        public void OrdinaPerScadenza()
        {
            Promemoria = Promemoria.OrderByDescending(promemoria => promemoria.Scadenza).ToList();
        }
    }
}
