namespace cashmonkey.Models
{
    public class VoceLogOperazioneManuale : VoceLog
    {
        public string Utente { get; set; }

        public VoceLogOperazioneManuale(
            DateTime timestamp,
            string operazione,
            string utente
        ) : base(timestamp, operazione)
        {
            this.Utente = utente;
        }

    }
}