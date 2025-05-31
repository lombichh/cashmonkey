namespace cashmonkey.Models
{
    public abstract class VoceLog
    {
        public DateTime Timestamp { get; set; }
        public string Operazione { get; set; }

        protected VoceLog(DateTime timestamp, string operazione)
        {
            this.Timestamp = timestamp;
            this.Operazione = operazione;
        }

    }
}