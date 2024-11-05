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
            <form className="input-pessoas">
                <input type="text" autoFocus placeholder="Nome" />
                <button onClick={addPerson}>Adicionar</button>
                <button onClick={cleanPeople}>limpar lista</button>
                <div>{people.length > 0 ? people.length : 'Lista vazia'}</div>
            </form>
            {people.length > 0 && (
                <table className='table m-3'>
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