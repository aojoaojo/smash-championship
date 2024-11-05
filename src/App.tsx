import './App.css'
import { InputPessoas } from './components/inputPessoas'
import { SeparePairs } from './components/separePairs'
import { ChampionshipContextProvider } from './contexts/ChampionshipContext'

function App() {

  return (
    <ChampionshipContextProvider>
      <InputPessoas />
      <SeparePairs />
    </ ChampionshipContextProvider>
  )
}

export default App
