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
        public Utente? Utente { get; set; }
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
            if (Utente == null)
                return BadRequest();
            else
                _registrazioneController.RegistraUtente(
                    request.Username,
                    request.Password,
                    request.ValutaRiferimento,
                    request.SaldoIniziale
                );
                return Ok();
        }

        [HttpPost("verifica-credenziali")]
        public ActionResult<string> VerificaCredenziali(string username, string password)
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_loginController.VerificaCredenziali(username, password));
        }

        [HttpPost("filtra-movimenti")]
        public ActionResult<StoricoMovimenti> FiltraMovimenti(FiltraMovimentiRequest request)
        {
            if (Utente == null)
                return BadRequest();
            else
            {
                return Ok(_filtroMovimentiController.FiltraMovimenti(
                    Utente,
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
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotale(Utente));
        }

        [HttpGet("calcola-totale-entrate")]
        public ActionResult<float> CalcolaTotaleEntrate()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleEntrate(Utente));
        }

        [HttpGet("calcola-totale-uscite")]
        public ActionResult<float> CalcolaTotaleUscite()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.CalcolaTotaleUscite(Utente));
        }

        [HttpPost("registra-movimento")]
        public IActionResult RegistraMovimento(RegistraMovimentoRequest request)
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RegistraMovimento(
                    Utente,
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
            if (Utente == null)
                return BadRequest();
            else
                _gestioneMovimentiController.RimuoviMovimento(
                    Utente,
                    movimento
                );
                return Ok();
        }

        [HttpGet("ottieni-movimenti")]
        public ActionResult<StoricoMovimenti> OttieniMovimenti()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMovimentiController.OttieniMovimenti(Utente));
        }

        [HttpPost("aggiungi-metodo-pagamento")]
        public IActionResult AggiungiMetodoPagamento(AggiungiMetodoPagamentoRequest request)
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.AggiungiMetodoPagamento(
                    Utente,
                    request.Nome,
                    request.Categoria
                );
                return Ok();
        }

        [HttpPost("rimuovi-metodo-pagamento")]
        public IActionResult RimuoviMetodoPagamento(MetodoPagamento metodoPagamento)
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestioneMetodiPagamentoController.RimuoviMetodoPagamento(
                    Utente,
                    metodoPagamento
                );
                return Ok();
        }

        [HttpGet("ottieni-metodi-pagamento")]
        public ActionResult<ElencoMetodiPagamento> OttieniMetodiPagamento()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneMetodiPagamentoController.OttieniMetodiPagamento(Utente));
        }

        [HttpGet("calcola-saldo-mancante")]
        public ActionResult<float> CalcolaSaldoMancante()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaSaldoMancante(Utente));
        }

        [HttpGet("calcola-tempo-rimanente")]
        public ActionResult<float> CalcolaTempoRimanente()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.CalcolaTempoRimanente(Utente));
        }

        [HttpPost("imposta-obiettivo-economico")]
        public IActionResult ImpostaObiettivoEconomico(ImpostaObiettivoEconomicoRequest request)
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.ImpostaObiettivoEconomico(
                    Utente,
                    request.Nome,
                    request.Importo,
                    request.Termine
                );
                return Ok();
        }

        [HttpPost("cancella-obiettivo-economico")]
        public IActionResult CancellaObiettivoEconomico()
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestioneObiettivoEconomicoController.CancellaObiettivoEconomico(Utente);
                return Ok();
        }

        [HttpGet("ottieni-obiettivo-economico")]
        public ActionResult<ObiettivoEconomico> OttieniObiettivoEconomico()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneObiettivoEconomicoController.OttieniObiettivoEconomico(Utente));
        }

        [HttpGet("calcola-totale-importi")]
        public ActionResult<float> CalcolaTotaleImporti()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestionePromemoriaController.CalcolaTotaleImporti(Utente));
        }

        [HttpPost("aggiungi-promemoria")]
        public IActionResult AggiungiPromemoria(AggiungiPromemoriaRequest request)
        {
            if (Utente == null)
                return BadRequest();
            else
                _gestionePromemoriaController.AggiungiPromemoria(
                    Utente,
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
            if (Utente == null)
                return BadRequest();
            else
                _gestionePromemoriaController.RimuoviPromemoria(Utente, promemoria);
                return Ok();
        }

        [HttpGet("ottieni-promemoria")]
        public ActionResult<ElencoPromemoria> OttieniPromemoria()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestionePromemoriaController.OttieniPromemoria(Utente));
        }

        [HttpGet("ottieni-saldo-corrente")]
        public ActionResult<float> OttieniSaldoCorrente()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestionesSaldoController.OttieniSaldoCorrente(Utente));
        }

        [HttpGet("ottieni-saldo-iniziale")]
        public ActionResult<float> OttieniSaldoIniziale()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestionesSaldoController.OttieniSaldoIniziale(Utente));
        }

        [HttpGet("genera-resoconto-annuale")]
        public IActionResult GeneraResocontoAnnuale()
        {
            if (Utente == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoAnnuale(Utente);
                return Ok();
            }
        }

        [HttpGet("genera-resoconto-mensile")]
        public IActionResult GeneraResocontoMensile()
        {
            if (Utente == null)
                return BadRequest();
            else
            {
                _gestioneResocontiController.GeneraResocontoMensile(Utente);
                return Ok();
            }
        }

        [HttpGet("ottieni-resoconto-annuale")]
        public ActionResult<ResocontoAnnuale> OttieniResocontoAnnuale()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoAnnuale(Utente));
        }

        [HttpGet("ottieni-resoconto-mensile")]
        public ActionResult<ResocontoMensile> OttieniResocontoMensile()
        {
            if (Utente == null)
                return BadRequest();
            else
                return Ok(_gestioneResocontiController.OttieniResocontoMensile(Utente));
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