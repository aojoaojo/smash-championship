import './App.css'
import { CreateGames } from './components/createGames'
import { InputPessoas } from './components/inputPessoas'
import { SeparePairs } from './components/separePairs'
import { ChampionshipContextProvider } from './contexts/ChampionshipContext'

function App() {

  return (
    <ChampionshipContextProvider>
      <InputPessoas />
      <SeparePairs />
      <CreateGames />
    </ ChampionshipContextProvider>
  )
}

export default App
