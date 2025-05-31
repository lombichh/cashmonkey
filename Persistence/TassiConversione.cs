using cashmonkey.Models;

namespace cashmonkey.Persistence
{
    public class TassiConversione
    {
        public static Dictionary<Valuta, Dictionary<Valuta, float>> _tassiConversione
            = new Dictionary<Valuta, Dictionary<Valuta, float>>
        {
            [Valuta.EURO] = new Dictionary<Valuta, float>
            {
                [Valuta.DOLLARO] = 1.13F,
                [Valuta.STERLINA] = 0.84F
            },
            [Valuta.DOLLARO] = new Dictionary<Valuta, float>
            {
                [Valuta.EURO] = 0.88F,
                [Valuta.STERLINA] = 0.74F
            },
            [Valuta.STERLINA] = new Dictionary<Valuta, float>
            {
                [Valuta.EURO] = 1.19F,
                [Valuta.DOLLARO] = 1.35F
            }
        };
    }
}