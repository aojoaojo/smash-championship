import { createContext, ReactNode, useEffect, useState } from "react";

export interface Person {
  index: number;
  name: string;
  pastPairs?: string[];
}

interface Pair {
  person: Person;
  pair: Person;
  points: number;
}

interface ChampionshipContextData {
  people: Person[];
  setPeople: (people: Person[]) => void;
  cleanPeople: () => void;
  removePerson: (index: number) => void;
  pairs: Pair[];
  setPairs: (pairs: Pair[]) => void;
}

export const ChampionshipContext = createContext({} as ChampionshipContextData);

export function ChampionshipContextProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<Person[]>(localStorage.getItem('people') ? JSON.parse(localStorage.getItem('people') as string) : []);
  const [pairs, setPairs] = useState<Pair[]>([]);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people))
  }, [people])

  function cleanPeople() {
    setPeople([])
  }

  function removePerson(index: number) {
    const newPeople = people.filter((_, i) => i !== index)
    setPeople(newPeople)
  }

  return (
    <ChampionshipContext.Provider
      value={{ people, setPeople, cleanPeople, removePerson, pairs, setPairs }}>
      {children}
    </ChampionshipContext.Provider>
  );
}