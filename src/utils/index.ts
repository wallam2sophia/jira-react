import { useState, useEffect } from 'react';

export const isFalse = (value: unknown): boolean => value === 0 ? false : !value

export const cleanObj = (object: object) => {
  const result = Object.assign({}, object)
  Object.keys(result).forEach(item => {
    const value: any = result[item]
    if(isFalse(value)){
      delete result[item]
    }
  })
  return result;
} 

export const useMount = (callback: () => void) => {
  useEffect(()=>{
    callback()
  }, [])
}

export const useDebunced = <V>(value: V, delay?:number) => {
  const [debuncedValue, setDebuncedValue] = useState(value)
  useEffect(() => {
      const timer = setTimeout(() => {
        setDebuncedValue(value)
      }, delay) 
      return () => clearTimeout(timer)
  }, [value, delay])

  return debuncedValue
}


interface Person {
  name: string,
  age: number
}
export const useArray = (persons: Person[]) => {
  const add = (a: Person) => {
    return persons.push(a)
  }
  const removeIndex = (index: number) => {
    persons.splice(index, 1)
  }

  const clear = () => {
    persons = []
  }
  return {
    persons,
    clear,
    removeIndex,
    add
  }

}