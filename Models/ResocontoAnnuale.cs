namespace cashmonkey.Models
{
    public class ResocontoAnnuale : Resoconto
    {

        public ResocontoAnnuale(
            DateTime dataInizio,
            DateTime dataFine
        ) : base(dataInizio, dataFine) {}

    }
}