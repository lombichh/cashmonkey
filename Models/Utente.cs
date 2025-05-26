namespace cashmonkey.Models
{
    public class Utente
    {
        public string Username { get; set; }
        public bool Bloccato { get; set; }
        public Saldo Saldo { get; set; }
        public StoricoMovimenti StoricoMovimenti { get; set; }
        public ElencoMetodiPagamento ElencoMetodiPagamento { get; set; }
        public Valuta ValutaRiferimento { get; set; }
        public ElencoPromemoria ElencoPromemoria { get; set; }
        public ObiettivoEconomico? ObiettivoEconomico { get; set; }

        // TODO: aggiungi gli altri attributi

        public Utente(string username, float saldoIniziale, Valuta valutaRiferimento)
        {
            this.Username = username;
            this.Bloccato = false;
            this.Saldo = new Saldo(saldoIniziale, this);
            this.StoricoMovimenti = new StoricoMovimenti();
            this.ElencoMetodiPagamento = new ElencoMetodiPagamento();
            this.ValutaRiferimento = valutaRiferimento;
            this.ElencoPromemoria = new ElencoPromemoria();
            this.ObiettivoEconomico = null;
        }

        public bool IsValutaRiferimento(Valuta valuta)
        {
            return valuta == this.ValutaRiferimento;
        }
    }
}
