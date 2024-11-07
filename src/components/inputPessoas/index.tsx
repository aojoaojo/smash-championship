import { useContext } from 'react'
import { ChampionshipContext } from '../../contexts/ChampionshipContext'
import './styles.css'

export function InputPessoas() {
    const { setPeople, people, cleanPeople, removePerson } = useContext(ChampionshipContext)

    function addPerson() {
        const input = document.querySelector('.input-pessoas input') as HTMLInputElement
        const name = input.value
        if (name) {
            setPeople([...people, { index: people.length, name }])
            input.value = ''
        }
    }

    return (
        <div className='text-white'>
            <h1>Adicionar Pessoas</h1>
            <form className="input-pessoas d-flex flex-column">
                <input type="text" autoFocus placeholder="Nome" />
                <button onClick={addPerson}>Adicionar</button>
                <button onClick={cleanPeople}>limpar lista</button>
                <div >número de pessoas: {people.length > 0 ? people.length : '0'}</div>
            </form>
            {people.length > 0 && (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, index) => (
                            <tr key={index}>
                                <td className='w-100'>{person.name}</td>
                                <td><button onClick={() => removePerson(person.index)}>remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}