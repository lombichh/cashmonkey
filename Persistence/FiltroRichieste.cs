using Microsoft.AspNetCore.Mvc;
using cashmonkey.Controllers;
using cashmonkey.Models;

namespace cashmonkey.Persistence
{
    [ApiController]
    [Route("api/[controller]")]
    public class FiltroRichieste : ControllerBase
    {
        private Utente? _utente;
        private GestioneResocontiController _gestioneResocontiController = new GestioneResocontiController();
        private LogController _logController = new LogController();
        private Logger _logger = new Logger();
        private SbloccoUtenteController _sbloccoUtenteController = new SbloccoUtenteController();
        private ConversioneImportoController _conversioneImportoController = new ConversioneImportoController();
        private FiltroMovimentiController _filtroMovimentiController = new FiltroMovimentiController();
        private GestioneMetodiPagamentoController _gestioneMetodiPagamentoController = new GestioneMetodiPagamentoController();
        private GestioneMovimentiController _gestioneMovimentiController = new GestioneMovimentiController();
        private GestioneObiettivoEconomicoController _gestioneObiettivoEconomicoController = new GestioneObiettivoEconomicoController();
        private GestionePromemoriaController _gestionePromemoriaController = new GestionePromemoriaController();
        private GestioneSaldoController _gestionesSaldoController = new GestioneSaldoController();
        private LoginController _loginController = new LoginController();
        private RegistrazioneController _registrazioneController = new RegistrazioneController();

        [HttpGet("genera-resoconto-annuale")]
        public IActionResult GeneraResocontoAnnuale()
        {
            if (_utente == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoAnnuale(_utente);
                return Ok();
            }
        }

        [HttpGet("genera-resoconto-mensile")]
        public IActionResult GeneraResocontoMensile()
        {
            if (_utente == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoMensile(_utente);
                return Ok();
            }
        }

        [HttpGet("ottieni-resoconto-annuale")]
        public ActionResult<ResocontoAnnuale> OttieniResocontoAnnuale()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoAnnuale(_utente));
        }

        [HttpGet("ottieni-resoconto-mensile")]
        public ActionResult<ResocontoMensile> OttieniResocontoMensile()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoMensile(_utente));
        }

        [HttpPost("ottieni-voci-log")]
        public ActionResult<Log> OttieniVociLog(DateTime inizio, DateTime fine)
        {
            return Ok(_logController.OttieniVociLog(inizio, fine));
        }

        [HttpGet("ottieni-voci-log-operazioni-automatiche")]
        public ActionResult<Log> OttieniVociLogOperazioniAutomatiche()
        {
            return Ok(_logController.OttieniVociLogOperazioniAutomatiche());
        }

        [HttpGet("ottieni-voci-log-operazioni-manuali")]
        public ActionResult<Log> OttieniVociLogOperazioniManuali()
        {
            return Ok(_logController.OttieniVociLogOperazioniManuali());
        }

        [HttpPost("print-operazione-automatica")]
        public IActionResult PrintOperazioneAutomatica(DateTime timestamp, string operazione, string evento)
        {
            _logger.PrintOperazioneAutomatica(timestamp, operazione, evento);
            return Ok();
        }

        [HttpPost("print-operazione-manuale")]
        public IActionResult PrintOperazioneManuale(DateTime timestamp, string operazione, string utente)
        {
            _logger.PrintOperazioneManuale(timestamp, operazione, utente);
            return Ok();
        }

        [HttpPost("sblocca-utente")]
        public IActionResult SbloccaUtente(string username)
        {
            _sbloccoUtenteController.SbloccaUtente(username);
            return Ok();
        }

        [HttpGet("ottieni-utenti-bloccati")]
        public ActionResult<List<string>> OttieniUtentiBloccati()
        {
            return Ok(_sbloccoUtenteController.OttieniUtentiBloccati());
        }

    }
}