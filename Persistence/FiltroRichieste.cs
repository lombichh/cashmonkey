using Microsoft.AspNetCore.Mvc;
using cashmonkey.Controllers;
using cashmonkey.Models;
using cashmonkey.DTOs;

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

        [HttpPost("filtra-movimenti")]
        public ActionResult<StoricoMovimenti> FiltraMovimenti(FiltraMovimentiRequest request)
        {
            if (_utente == null)
                return BadRequest();
            else
            {
                return Ok(_filtroMovimentiController.FiltraMovimenti(
                    _utente,
                    request.DataIniziale,
                    request.DataFinale,
                    request.Categoria,
                    request.MetodoPagamento,
                    request.Valuta
                ));
            }
        }

        [HttpGet("calcola-totale")]
        public ActionResult<float> CalcolaTotale()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotale(_utente));
        }

        [HttpGet("calcola-totale-entrate")]
        public ActionResult<float> CalcolaTotaleEntrate()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleEntrate(_utente));
        }

        [HttpGet("calcola-totale-uscite")]
        public ActionResult<float> CalcolaTotaleUscite()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleUscite(_utente));
        }

        [HttpPost("registra-movimento")]
        public IActionResult RegistraMovimento(RegistraMovimentoRequest request)
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RegistraMovimento(
                    _utente,
                    request.Id,
                    request.ImportoOriginale,
                    request.Data,
                    request.Descrizione,
                    request.MetodoPagamento,
                    request.Valuta,
                    request.Categoria
                );
                return Ok();
        }

        [HttpPost("rimuovi-movimento")]
        public IActionResult RimuoviMovimento(Movimento movimento)
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RimuoviMovimento(
                    _utente,
                    movimento
                );
                return Ok();
        }

        [HttpGet("ottieni-movimenti")]
        public ActionResult<StoricoMovimenti> OttieniMovimenti()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.OttieniMovimenti(_utente));
        }

        [HttpPost("aggiungi-metodo-pagamento")]
        public IActionResult AggiungiMetodoPagamento(AggiungiMetodoPagamentoRequest request)
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.AggiungiMetodoPagamento(
                    _utente,
                    request.Nome,
                    request.Categoria
                );
                return Ok();
        }

        [HttpPost("rimuovi-metodo-pagamento")]
        public IActionResult RimuoviMetodoPagamento(MetodoPagamento metodoPagamento)
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.RimuoviMetodoPagamento(
                    _utente,
                    metodoPagamento
                );
                return Ok();
        }

        [HttpGet("ottieni-metodi-pagamento")]
        public ActionResult<ElencoMetodiPagamento> OttieniMetodiPagamento()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMetodiPagamentoController.OttieniMetodiPagamento(_utente));
        }

        [HttpGet("calcola-saldo-mancante")]
        public ActionResult<float> CalcolaSaldoMancante()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaSaldoMancante(_utente));
        }

        [HttpGet("calcola-tempo-rimanente")]
        public ActionResult<float> CalcolaTempoRimanente()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaTempoRimanente(_utente));
        }

        [HttpPost("imposta-obiettivo-economico")]
        public IActionResult ImpostaObiettivoEconomico(ImpostaObiettivoEconomicoRequest request)
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.ImpostaObiettivoEconomico(
                    _utente,
                    request.Nome,
                    request.Importo,
                    request.Termine
                );
                return Ok();
        }

        [HttpPost("cancella-obiettivo-economico")]
        public IActionResult CancellaObiettivoEconomico()
        {
            if (_utente == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.CancellaObiettivoEconomico(_utente);
                return Ok();
        }

        [HttpGet("ottieni-obiettivo-economico")]
        public ActionResult<ObiettivoEconomico> OttieniObiettivoEconomico()
        {
            if (_utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.OttieniObiettivoEconomico(_utente));
        }

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