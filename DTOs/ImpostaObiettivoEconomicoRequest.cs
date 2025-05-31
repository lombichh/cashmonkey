using cashmonkey.Models;

namespace cashmonkey.DTOs
{
    public class ImpostaObiettivoEconomicoRequest
    {
        public string Nome { get; set; }
        public float Importo { get; set; }
        public DateTime Termine { get; set; }
    }
}
