namespace cashmonkey.Models
{
    public class ElencoPromemoria
    {
        public List<Promemoria> ListaPromemoria { get; set; }

        public ElencoPromemoria()
        {
            this.ListaPromemoria = [];
        }

        public float CalcolaTotaleImporti()
        {
            float totaleImporti = 0;

            foreach (Promemoria promemoria in ListaPromemoria)
            {
                // TODO: sistema esterno
            }

            return totaleImporti;
        }

        public void OrdinaPerScadenza()
        {
            ListaPromemoria = ListaPromemoria.OrderByDescending(promemoria => promemoria.Scadenza).ToList();
        }
    }
}
