namespace cashmonkey.Models
{
    public class StoricoMovimenti
    {
        public List<Movimento> Movimenti { get; set; }

        public StoricoMovimenti()
        {
            this.Movimenti = [];
        }

        public StoricoMovimenti(List<Movimento> movimenti)
        {
            this.Movimenti = movimenti;
        }

        public float CalcolaTotale()
        {
            float totale = 0;

            foreach (Movimento movimento in Movimenti)
            {
                // TODO: sistema esterno
            }

            return totale;
        }

        public float CalcolaTotaleEntrate()
        {
            float totaleEntrate = 0;

            foreach (Movimento movimento in Movimenti) {
                // TODO: sistema esterno
            }

            return totaleEntrate;
        }

        public float CalcolaTotaleUscite()
        {
            float totaleUscite = 0;

            foreach (Movimento movimento in Movimenti) {
                // TODO: sistema esterno
            }

            return totaleUscite;
        }

        public void OrdinaPerData()
        {
            Movimenti = Movimenti.OrderByDescending(movimento => movimento.Data).ToList();
        }
    }
}