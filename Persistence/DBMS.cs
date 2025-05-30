using cashmonkey.Models;

namespace cashmonkey.Persistence
{
    public class DBMS
    {
        private Dictionary<string, string> _gestoriSicurezza;
        private Dictionary<string, Utente> _utenti;

        public DBMS()
        {
            _gestoriSicurezza = new Dictionary<string, string>();
            _gestoriSicurezza.Add("admin", "admin");

            _utenti = new Dictionary<string, Utente>();
            Utente matteo = new Utente("matteo", "matteopass", Valuta.EURO, 15300);
            _utenti.Add("matteo", matteo);
        }

        public string VerificaCredenziali(string username, string password)
        {
            if (_gestoriSicurezza.ContainsKey(username)
                && _gestoriSicurezza[username] == password) return "GestoreSicurezza";
            else if (_utenti.ContainsKey(username)
                && _utenti[username].Password == password
                && _utenti[username].Bloccato == false) return "Utente";
            else return "error";
        }

        public void InsertUtente(Utente utente)
        {
            _utenti.Add(utente.Username, utente);
        }

        public void InsertMovimento(Movimento movimento, string username)
        {
            _utenti[username].StoricoMovimenti.Movimenti.Add(movimento);
        }

        public void RemoveMovimento(Movimento movimento, string username)
        {
            for (int i = 0; i < _utenti[username].StoricoMovimenti.Movimenti.Count; i++)
            {
                if (_utenti[username].StoricoMovimenti.Movimenti[i].Id == movimento.Id)
                {
                    _utenti[username].StoricoMovimenti.Movimenti.RemoveAt(i);
                    break;
                }
            }
        }

        public void InsertObiettivoEconomico(
            ObiettivoEconomico obiettivoEconomico,
            string username
        )
        {
            _utenti[username].ObiettivoEconomico = obiettivoEconomico;
        }

        public void RemoveObiettivoEconomico(string username)
        {
            _utenti[username].ObiettivoEconomico = null;
        }

        public void InsertMetodoPagamento(
            MetodoPagamento metodoPagamento,
            string username
        )
        {
            _utenti[username].ElencoMetodiPagamento.MetodiPagamento.Add(metodoPagamento);
        }

        public void RemoveMetodoPagamento(
            MetodoPagamento metodoPagamento,
            string username
        )
        {
            for (int i = 0; i < _utenti[username].ElencoMetodiPagamento.MetodiPagamento.Count; i++)
            {
                if (_utenti[username].ElencoMetodiPagamento.MetodiPagamento[i].Nome
                     == metodoPagamento.Nome)
                {
                    _utenti[username].ElencoMetodiPagamento.MetodiPagamento.RemoveAt(i);
                    break;
                }
            }
        }

        public void InsertPromemoria(
           Promemoria promemoria,
            string username
        )
        {
            _utenti[username].ElencoPromemoria.ListaPromemoria.Add(promemoria);
        }

        public void RemovePromemoria(
            Promemoria promemoria,
            string username
        )
        {
            for (int i = 0; i < _utenti[username].ElencoPromemoria.ListaPromemoria.Count; i++)
            {
                if (_utenti[username].ElencoPromemoria.ListaPromemoria[i].Nome
                     == promemoria.Nome)
                {
                    _utenti[username].ElencoPromemoria.ListaPromemoria.RemoveAt(i);
                    break;
                }
            }
        }

        public Utente GetUtente(string username)
        {
            return _utenti[username];
        }

        public StoricoMovimenti GetStoricoMovimenti(string username)
        {
            return _utenti[username].StoricoMovimenti;
        }

        public ObiettivoEconomico? GetObiettivoEconomico(string username)
        {
            return _utenti[username].ObiettivoEconomico;
        }

        public ElencoMetodiPagamento GetMetodiPagamento(string username)
        {
            return _utenti[username].ElencoMetodiPagamento;
        }

        public void SetMetodiPagamento(
            string username,
            ElencoMetodiPagamento elencoMetodiPagamento
        )
        {
            _utenti[username].ElencoMetodiPagamento = elencoMetodiPagamento;
        }

        public Saldo GetSaldo(string username)
        {
            return _utenti[username].Saldo;
        }

        public ElencoPromemoria GetPromemoria(string username)
        {
            return _utenti[username].ElencoPromemoria;
        }

        public void SetPromemoria(
            string username,
            ElencoPromemoria elencoPromemoria
        )
        {
            _utenti[username].ElencoPromemoria = elencoPromemoria;
        }
    }
}