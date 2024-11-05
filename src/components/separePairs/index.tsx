import { useContext } from "react";
import { ChampionshipContext, Person } from "../../contexts/ChampionshipContext";


export function SeparePairs() {
    const { people, setPeople, pairs, setPairs } = useContext(ChampionshipContext); // Certifique-se de que você tem setPeople no contexto

    function letPeoplePair() {
        if (people.length % 2 !== 0) {
            setPeople([...people, { index: people.length, name: "Bot", pastPairs: [] }]);
        }
    }

    function separe() {

        const remainingPeople = [...people];
        const newPairs: { person: Person; pair: Person; points: number }[] = [];

        while (remainingPeople.length > 1) {
            const person = remainingPeople[Math.floor(Math.random() * remainingPeople.length)];
            const peopleThatCanPair = remainingPeople.filter(
                (p) => p.name !== person.name && !person.pastPairs?.includes(p.name)
            );
            const randomIndex = Math.floor(Math.random() * peopleThatCanPair.length);
            const pair = peopleThatCanPair[randomIndex];

            if (pair) {
                newPairs.push({ person, pair, points: 0 });
                person.pastPairs = [...(person.pastPairs || []), pair.name];
                pair.pastPairs = [...(pair.pastPairs || []), person.name];
                remainingPeople.splice(remainingPeople.indexOf(person), 1);
                remainingPeople.splice(remainingPeople.indexOf(pair), 1);
            } else {
                break;
            }
        }
        setPairs(newPairs);
        console.log(newPairs);
    }

    return (
        <div>
            <button onClick={separe} title="Separa as duplas">Separe</button>
            <button onClick={letPeoplePair} title="Adiciona um bot para que a quantidade de pessoas seja par.">Add Bot</button>
            {pairs.length > 0 && (
                <table className="table m-3">
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Pair</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pairs.map((pair, index) => (
                            <tr key={index}>
                                <td>{pair.person.name}</td>
                                <td>{pair.pair.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
