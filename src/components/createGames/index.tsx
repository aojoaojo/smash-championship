import { useContext, useState } from "react";
import { ChampionshipContext, Pair } from "../../contexts/ChampionshipContext";

export function CreateGames() {
    const { pairs } = useContext(ChampionshipContext);
    const [pairsGaming, setPairsGaming] = useState<Pair[]>([]);

    if (pairs.length % 2 !== 0) {
        const duplaComBot = pairs.map((p, index) => {
            if (p.person.name === "Bot" || p.pair.name === "Bot") {
                return index;
            }
            return null;
        });
        const indexDuplaComBot = duplaComBot.filter((index) => index !== null);
        const duplasSemBot = pairs.filter((p, index) => index !== indexDuplaComBot[0]);
    }

    // Seleciona dois pares aleatórios com a mesma quantidade de pontos
    function selectPairs() {
        const pairsWithSamePoints = pairs.filter((pair) => pair.points === pairs[0].points);
        const randomIndex = Math.floor(Math.random() * pairsWithSamePoints.length);
        const pair1 = pairsWithSamePoints[randomIndex];
        pairsWithSamePoints.splice(randomIndex, 1);
        const randomIndex2 = Math.floor(Math.random() * pairsWithSamePoints.length);
        const pair2 = pairsWithSamePoints[randomIndex2];
        return [pair1, pair2];
    }

    function createGames() {
        const selectedPairs = selectPairs();
        setPairsGaming(selectedPairs); // Atualiza o estado com os pares selecionados
        console.log('pairsGaming', selectedPairs);
    }

    function saveGame() {
        const result = document.getElementById('winner') as HTMLSelectElement;
        if (result.value === "1") {
            pairsGaming[0].points += 1;
            console.log('campeão', pairsGaming[0].person.name, pairsGaming[0].pair.name);
        }
        else if (result.value === "2") {
            pairsGaming[1].points += 1;
            console.log('campeão', pairsGaming[1].person.name, pairsGaming[1].pair.name);
        }
        else {
            console.log('error');
        }
    }

    return (
        <div className="text-white m-3">
            <h1>Criar Partida</h1>
            <button onClick={createGames}>Criar Partida</button>
            {pairsGaming.length === 2 && (
                <div>
                    {pairsGaming[0].person.name} e {pairsGaming[0].pair.name} <br />x<br />
                    {pairsGaming[1].person.name} e {pairsGaming[1].pair.name}
                </div>
            )}
            {pairsGaming.length === 2 && ( // Verifica se pairsGaming tem os pares antes de renderizar o select
                <div>
                    <h3 className="mt-3">quem ganhou?</h3>
                    <form>
                        <select name="winner" id="winner">
                            <option value="1">{pairsGaming[0].person.name} e {pairsGaming[0].pair.name}</option>
                            <option value="2">{pairsGaming[1].person.name} e {pairsGaming[1].pair.name}</option>
                        </select>
                        <button type="button" onClick={saveGame}>Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
}
