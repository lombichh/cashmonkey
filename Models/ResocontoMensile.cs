namespace cashmonkey.Models
{
    public class ResocontoMensile : Resoconto
    {

        public ResocontoMensile(
            DateTime dataInizio,
            DateTime dataFine
        ) : base(dataInizio, dataFine) {}

    }
}