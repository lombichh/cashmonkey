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

        public float GetValoreCorrente()
        {
            float valoreCorrente = 0;

            foreach (Movimento movimento in Utente.StoricoMovimenti.Movimenti) {
                // TODO: sistema esterno
            }

            return valoreCorrente;
        }
    }
}
