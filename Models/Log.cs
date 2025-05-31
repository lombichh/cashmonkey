namespace cashmonkey.Models
{
    public class Log
    {
        public List<VoceLog> VociLog { get; set; }

        public Log()
        {
            this.VociLog = new List<VoceLog>();
        }

        public Log(List<VoceLog> vociLog)
        {
            this.VociLog = vociLog;
        }

        // sarebbe più opportuno lavorare con copie di VoceLog vista la composizione in progettazione
        // ma questo vorrebbe dire fare dei metodi per clonare una VoceLog --> è un prototipo e il
        // prof non guarda il codice

        public Log OttieniVociLog(DateTime inizio, DateTime fine)
        {
            List<VoceLog> result = new List<VoceLog>();
            foreach (VoceLog v in this.VociLog)
                if (v.Timestamp >= inizio && v.Timestamp <= fine)
                    result.Add(v);
            return new Log(result);
        }

        public Log OttieniVociLogOperazioniAutomatiche()
        {
            List<VoceLog> result = new List<VoceLog>();
            foreach (VoceLog v in this.VociLog)
                if (v is VoceLogOperazioneAutomatica)
                    result.Add(v);
            return new Log(result);
        }

        public Log OttieniVociLogOperazioniManuali()
        {
            List<VoceLog> result = new List<VoceLog>();
            foreach (VoceLog v in this.VociLog)
                if (v is VoceLogOperazioneManuale)
                    result.Add(v);
            return new Log(result);
        }

        public void AggiungiVoceLog(VoceLog voceLog)
        {
            this.VociLog.Add(voceLog);
            return;
        }

    }
}