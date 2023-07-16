'use client'

import { useEffect, useState } from 'react'
import { InfoFrame } from './InfoFrame'
import { api } from '@/lib/axios'

export function Infos() {
  const [quantityAnimals, setQuantityAnimals] = useState()
  const [quantityResponsibles, setQuantityResponsibles] = useState()
  const [quantityVet, setQuantityVet] = useState()

  useEffect(() => {
    async function getQuantityAnimals() {
      const response = await api.get('/animal-cad')

      setQuantityAnimals(response.data.quantity)
    }

    async function getQuantityResponsibles() {
      const response = await api.get('/responsible-cad')

      setQuantityResponsibles(response.data.quantity)
    }

    async function getQuantityVet() {
      const response = await api.get('/vet-cad')

      setQuantityVet(response.data.quantity)
    }

    getQuantityAnimals()
    getQuantityResponsibles()
    getQuantityVet()
  }, [])

  return (
    <div className="flex flex-col gap-16">
      <InfoFrame
        color="PRIMARY"
        quantity={quantityAnimals}
        text="Animais cadastrados"
      />
      <InfoFrame
        color="SECONDARY"
        quantity={quantityResponsibles}
        text="Responsáveis cadastrados"
      />
      <InfoFrame
        color="TERTIARY"
        quantity={quantityVet}
        text="Veterinários cadastrados"
      />
    </div>
  )
}
