import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registrazione from './pages/Registrazione'
import Saldo from './pages/Saldo'
import Resoconti from './pages/Resoconti'
import GestioneMovimenti from './pages/GestioneMovimenti'
import GestionePromemoria from './pages/GestionePromemoria'
import GestioneObiettivoEconomico from './pages/GestioneObiettivoEconomico'
import GestioneMetodiPagamento from './pages/GestioneMetodiPagamento'
import GestoreSicurezza from './pages/GestoreSicurezza'
import SbloccoUtente from './pages/SbloccoUtente'
import Log from './pages/Log'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registrazione" element={<Registrazione />} />
      <Route path="/saldo" element={<Saldo />} />
      <Route path="/resoconti" element={<Resoconti />} />
      <Route path="/movimenti" element={<GestioneMovimenti />} />
      <Route path="/promemoria" element={<GestionePromemoria />} />
      <Route path="/obiettivo" element={<GestioneObiettivoEconomico />} />
      <Route path="/metodi" element={<GestioneMetodiPagamento />} />
      <Route path="/sicurezza" element={<GestoreSicurezza />} />
      <Route path="/sblocco" element={<SbloccoUtente />} />
      <Route path="/log" element={<Log />} />
    </Routes>
  )
}

export default App