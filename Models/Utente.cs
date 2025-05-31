namespace cashmonkey.Models
{
    public class Utente
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool Bloccato { get; set; }
        public ElencoMetodiPagamento ElencoMetodiPagamento { get; set; }
        public Valuta ValutaRiferimento { get; set; }
        public Saldo Saldo { get; set; }
        public StoricoMovimenti StoricoMovimenti { get; set; }
        public ElencoPromemoria ElencoPromemoria { get; set; }
        public ObiettivoEconomico? ObiettivoEconomico { get; set; }
        public ResocontoAnnuale? ResocontoAnnuale { get; set; }
        public ResocontoMensile? ResocontoMensile { get; set; }

        public Utente(string username, string password, Valuta valutaRiferimento, float saldoIniziale)
        {
            this.Username = username;
            this.Password = password;
            this.Bloccato = false;
            this.ElencoMetodiPagamento = new ElencoMetodiPagamento();
            this.ValutaRiferimento = valutaRiferimento;
            this.Saldo = new Saldo(saldoIniziale, this);
            this.StoricoMovimenti = new StoricoMovimenti();
            this.ElencoPromemoria = new ElencoPromemoria();
            this.ObiettivoEconomico = null;
            this.ResocontoAnnuale = null;
            this.ResocontoMensile = null;
        }

        public bool IsValutaRiferimento(Valuta valuta)
        {
            return valuta == this.ValutaRiferimento;
        }
    }
}