using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class RimuoviMovimentoRequest
    {
        public Utente Utente { get; set; }
        public Movimento Movimento { get; set; }
    }
}
