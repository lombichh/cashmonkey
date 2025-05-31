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

        public void OrdinaPerData()
        {
            Movimenti = Movimenti.OrderByDescending(movimento => movimento.Data).ToList();
        }
    }
}