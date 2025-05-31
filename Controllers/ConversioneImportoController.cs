using cashmonkey.Models;
using cashmonkey.Persistence;

namespace cashmonkey.Controllers
{
    public class ConversioneImportoController : Controller
    {
        public float ConvertiImportoRiferimento(
            Utente utente,
            float importoOriginale,
            Valuta valutaOriginale
        )
        {
            return importoOriginale * TassiConversione._tassiConversione[valutaOriginale][utente.ValutaRiferimento];
        }
    }
}
