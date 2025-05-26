namespace cashmonkey.Models
{
    public class ElencoPromemoria
    {
        public List<Promemoria> Promemoria { get; set; }

        public ElencoPromemoria()
        {
            this.Promemoria = [];
        }

        public float CalcolaTotaleImporti()
        {
            float totaleImporti = 0;

            foreach (Promemoria promemoria in Promemoria)
            {
                // TODO: sistema esterno
            }

            return totaleImporti;
        }

        public void OrdinaPerScadenza()
        {
            Promemoria = Promemoria.OrderByDescending(promemoria => promemoria.Scadenza).ToList();
        }
    }
}
