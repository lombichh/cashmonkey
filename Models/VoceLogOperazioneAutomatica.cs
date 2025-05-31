namespace cashmonkey.Models
{
    public class VoceLogOperazioneAutomatica : VoceLog
    {
        public string Evento { get; set; }

        public VoceLogOperazioneAutomatica(
            DateTime timestamp,
            string operazione,
            string evento
        ) : base(timestamp, operazione)
        {
            this.Evento = evento;
        }

    }
}