namespace cashmonkey.Models
{
    public class Saldo
    {
        public float ValoreIniziale { get; set; }
        public Utente Utente { get; set; }

        public Saldo(float valoreIniziale, Utente utente)
        {
            this.ValoreIniziale = valoreIniziale;
            this.Utente = utente;
        }
    }
}
