namespace cashmonkey.Models
{
    public class ElencoPromemoria
    {
        public List<Promemoria> ListaPromemoria { get; set; }

        public ElencoPromemoria()
        {
            this.ListaPromemoria = [];
        }

        public void OrdinaPerScadenza()
        {
            ListaPromemoria = ListaPromemoria.OrderByDescending(promemoria => promemoria.Scadenza).ToList();
        }
    }
}
