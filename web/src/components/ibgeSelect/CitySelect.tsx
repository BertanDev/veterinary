import React, { useEffect, useState, useContext, createContext } from 'react'
import { fetchCitiesForStates } from '../../../services/ibge'

import { LocalContext } from '../../../contexts/local'

const BrazilCities = ({ state }) => {
  const [cities, setCities] = useState([])

  const { cidade, setCidade } = useContext(LocalContext)

  useEffect(() => {
    fetchCitiesForStates(state).then((cities) => {
      setCities(cities)
    })
  }, [state])

  return (
    <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
      <option value=""> Selecione uma cidade... </option>
      {cities.map((city) => {
        const { id, nome } = city
        return (
          <option key={id} value={nome}>
            {' '}
            {nome}{' '}
          </option>
        )
      })}
    </select>
  )
}

export default BrazilCities
