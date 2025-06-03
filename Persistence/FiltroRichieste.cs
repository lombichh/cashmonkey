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
        private GestioneResocontiController _gestioneResocontiController;
        private LogController _logController;
        private Logger _logger;
        private SbloccoUtenteController _sbloccoUtenteController;
        private ConversioneImportoController _conversioneImportoController;
        private FiltroMovimentiController _filtroMovimentiController;
        private GestioneMetodiPagamentoController _gestioneMetodiPagamentoController;
        private GestioneMovimentiController _gestioneMovimentiController;
        private GestioneObiettivoEconomicoController _gestioneObiettivoEconomicoController;
        private GestionePromemoriaController _gestionePromemoriaController;
        private GestioneSaldoController _gestionesSaldoController;
        private LoginController _loginController;
        private RegistrazioneController _registrazioneController;

        public FiltroRichieste()
        {
            _gestioneResocontiController = new GestioneResocontiController();
            _logController = new LogController();
            _logger = new Logger();
            _sbloccoUtenteController = new SbloccoUtenteController();
            _conversioneImportoController = new ConversioneImportoController();
            _filtroMovimentiController = new FiltroMovimentiController();
            _gestioneMetodiPagamentoController = new GestioneMetodiPagamentoController();
            _gestioneMovimentiController = new GestioneMovimentiController();
            _gestioneObiettivoEconomicoController = new GestioneObiettivoEconomicoController();
            _gestionePromemoriaController = new GestionePromemoriaController();
            _gestionesSaldoController = new GestioneSaldoController();
            _loginController = new LoginController(this);
            _registrazioneController = new RegistrazioneController();
        }

        [HttpPost("registra-utente")]
        public IActionResult RegistraUtente(RegistraUtenteRequest request)
        {
            try 
            {
                _registrazioneController.RegistraUtente(
                    request.Username,
                    request.Password,
                    request.ValutaRiferimento,
                    request.SaldoIniziale
                );
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("verifica-credenziali")]
        public ActionResult<string> VerificaCredenziali(VerificaCredenzialiRequest request)
        {
            try 
            {
                string result = _loginController.VerificaCredenziali(request.Username, request.Password);
                if (result == null)
                    return Unauthorized(new { message = "Credenziali non valide" });
                else
                {
                    HttpContext.Session.SetString(result, request.Username);
                    return Ok(new { token = result });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("filtra-movimenti")]
        public ActionResult<StoricoMovimenti> FiltraMovimenti(FiltraMovimentiRequest request)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
            {
                return Ok(_filtroMovimentiController.FiltraMovimenti(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
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
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotale(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("calcola-totale-entrate")]
        public ActionResult<float> CalcolaTotaleEntrate()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleEntrate(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("calcola-totale-uscite")]
        public ActionResult<float> CalcolaTotaleUscite()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleUscite(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpPost("registra-movimento")]
        public IActionResult RegistraMovimento(RegistraMovimentoRequest request)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RegistraMovimento(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
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
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RimuoviMovimento(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    movimento
                );
                return Ok();
        }

        [HttpGet("ottieni-movimenti")]
        public ActionResult<StoricoMovimenti> OttieniMovimenti()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.OttieniMovimenti(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpPost("aggiungi-metodo-pagamento")]
        public IActionResult AggiungiMetodoPagamento(AggiungiMetodoPagamentoRequest request)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.AggiungiMetodoPagamento(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    request.Nome,
                    request.Categoria
                );
                return Ok();
        }

        [HttpPost("rimuovi-metodo-pagamento")]
        public IActionResult RimuoviMetodoPagamento(MetodoPagamento metodoPagamento)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.RimuoviMetodoPagamento(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    metodoPagamento
                );
                return Ok();
        }

        [HttpGet("ottieni-metodi-pagamento")]
        public ActionResult<ElencoMetodiPagamento> OttieniMetodiPagamento()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneMetodiPagamentoController.OttieniMetodiPagamento(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("calcola-saldo-mancante")]
        public ActionResult<float> CalcolaSaldoMancante()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaSaldoMancante(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("calcola-tempo-rimanente")]
        public ActionResult<float> CalcolaTempoRimanente()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaTempoRimanente(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpPost("imposta-obiettivo-economico")]
        public IActionResult ImpostaObiettivoEconomico(ImpostaObiettivoEconomicoRequest request)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.ImpostaObiettivoEconomico(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    request.Nome,
                    request.Importo,
                    request.Termine
                );
                return Ok();
        }

        [HttpPost("cancella-obiettivo-economico")]
        public IActionResult CancellaObiettivoEconomico()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.CancellaObiettivoEconomico(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                );
                return Ok();
        }

        [HttpGet("ottieni-obiettivo-economico")]
        public ActionResult<ObiettivoEconomico> OttieniObiettivoEconomico()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.OttieniObiettivoEconomico(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("calcola-totale-importi")]
        public ActionResult<float> CalcolaTotaleImporti()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestionePromemoriaController.CalcolaTotaleImporti(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpPost("aggiungi-promemoria")]
        public IActionResult AggiungiPromemoria(AggiungiPromemoriaRequest request)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestionePromemoriaController.AggiungiPromemoria(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    request.Nome,
                    request.Importo,
                    request.Scadenza,
                    request.Descrizione,
                    request.Valuta,
                    request.Categoria
                );
                return Ok();
        }

        [HttpPost("rimuovi-promemoria")]
        public IActionResult RimuoviPromemoria(Promemoria promemoria)
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                _gestionePromemoriaController.RimuoviPromemoria(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username),
                    promemoria
                );
                return Ok();
        }

        [HttpGet("ottieni-promemoria")]
        public ActionResult<ElencoPromemoria> OttieniPromemoria()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestionePromemoriaController.OttieniPromemoria(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("ottieni-saldo-corrente")]
        public ActionResult<float> OttieniSaldoCorrente()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestionesSaldoController.OttieniSaldoCorrente(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("ottieni-saldo-iniziale")]
        public ActionResult<float> OttieniSaldoIniziale()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestionesSaldoController.OttieniSaldoIniziale(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("genera-resoconto-annuale")]
        public IActionResult GeneraResocontoAnnuale()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoAnnuale(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                );
                return Ok();
            }
        }

        [HttpGet("genera-resoconto-mensile")]
        public IActionResult GeneraResocontoMensile()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoMensile(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                );
                return Ok();
            }
        }

        [HttpGet("ottieni-resoconto-annuale")]
        public ActionResult<ResocontoAnnuale> OttieniResocontoAnnuale()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoAnnuale(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpGet("ottieni-resoconto-mensile")]
        public ActionResult<ResocontoMensile> OttieniResocontoMensile()
        {
            string username;
            if ((username = HttpContext.Session.GetString("Utente")) == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoMensile(
                    cashmonkey.Controllers.Controller.dbConnection.GetUtente(username)
                ));
        }

        [HttpPost("ottieni-voci-log")]
        public ActionResult<Log> OttieniVociLog(OttieniVociLogRequest request)
        {
            if (HttpContext.Session.GetString("GestoreSicurezza") == null)
                return BadRequest();
            else
                return Ok(_logController.OttieniVociLog(request.Inizio, request.Fine));
        }

        [HttpGet("ottieni-voci-log-operazioni-automatiche")]
        public ActionResult<Log> OttieniVociLogOperazioniAutomatiche()
        {
            if (HttpContext.Session.GetString("GestoreSicurezza") == null)
                return BadRequest();
            else
                return Ok(_logController.OttieniVociLogOperazioniAutomatiche());
        }

        [HttpGet("ottieni-voci-log-operazioni-manuali")]
        public ActionResult<Log> OttieniVociLogOperazioniManuali()
        {
            if (HttpContext.Session.GetString("GestoreSicurezza") == null)
                return BadRequest();
            else
                return Ok(_logController.OttieniVociLogOperazioniManuali());
        }

        [HttpPost("sblocca-utente")]
        public IActionResult SbloccaUtente(string username)
        {
            if (HttpContext.Session.GetString("GestoreSicurezza") == null)
                return BadRequest();
            else
            {
                _sbloccoUtenteController.SbloccaUtente(username);
                return Ok();
            }
        }

        [HttpGet("ottieni-utenti-bloccati")]
        public ActionResult<List<string>> OttieniUtentiBloccati()
        {
            if (HttpContext.Session.GetString("GestoreSicurezza") == null)
                return BadRequest();
            else
                return Ok(_sbloccoUtenteController.OttieniUtentiBloccati());
        }

    }
}