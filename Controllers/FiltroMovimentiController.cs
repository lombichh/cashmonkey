using Microsoft.AspNetCore.Mvc;
using cashmonkey.Models;
using cashmonkey.Persistence;
using cashmonkey.DTOs;

namespace cashmonkey.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FiltroMovimentiController : Controller
    {
        [HttpPost("filtra-movimenti")]
        public ActionResult<StoricoMovimenti> FiltraMovimenti(FiltraMovimentiRequest request)
        {
            StoricoMovimenti storicoMovimentiFiltrato = new StoricoMovimenti();

            DBMS dbConnection = getConnection();
            StoricoMovimenti storicoMovimenti = dbConnection.GetStoricoMovimenti(request.Utente.Username);

            foreach (Movimento movimento in storicoMovimenti.Movimenti)
            {
                if (movimento.Data >= request.DataIniziale
                    && movimento.Data <= request.DataFinale
                    && movimento.Categoria == request.Categoria
                    && movimento.MetodoPagamento == request.MetodoPagamento
                    && movimento.Valuta == request.Valuta)
                    storicoMovimentiFiltrato.Movimenti.Add(movimento);
            }

            return Ok(storicoMovimentiFiltrato);
        }
    }
}
