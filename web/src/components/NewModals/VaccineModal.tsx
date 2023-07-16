'use client'

import { X, AngryIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '../Input'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'
import InputMask from 'react-input-mask'

interface VaccineModalProps {
  isEdit?: boolean
  editId?: string

  closeModal: () => void
  getVaccines?: () => void
}

export function VaccineModal({
  closeModal,
  getVaccines,
  editId,
  isEdit,
}: VaccineModalProps) {
  const [name, setName] = useState('')
  const [animalId, setAnimalId] = useState('')
  const [ml, setMl] = useState('')
  const [validate, setValidate] = useState(null)

  const [animals, setAnimals] = useState([])

  useEffect(() => {
    async function getAnimals() {
      const response = await api.get('/animals')

      return response.data
    }

    const getData = async () => {
      const data = await getAnimals()
      setAnimals(data)
    }

    getData()
  }, [])

  async function handleAddNewVaccine() {
    try {
      await api.post('/vaccine', {
        name,
        animalId,
        ml,
        validate,
      })

      toast.success('Vacina adicionada')
      getVaccines()

      setName('')
      setAnimalId('')
      setMl('')
      setValidate('')
    } catch (error) {}
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 flex flex-col">
        <div className="flex w-full justify-between mb-3">
          <button onClick={closeModal}>
            <X className="w-6 h-6 text-red-600" />
          </button>

          <p className="font-alt text-xl text-[#32B18B] font-bold">
            Adicionar vacina
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Input
            type="text"
            placeHolder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={AngryIcon}
          />
        </div>

        <div className="flex mt-2 gap-1 w-96">
          <InputMask
            id="birth"
            mask="99/99/9999"
            className="pl-5 py-3 border-2 border-white w-40 bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
            placeholder="Data Validade"
            value={validate}
            type="text"
            onChange={(event) =>
              setValidate(event.target.value.replace(/\//g, ''))
            }
          />

          <Input
            type="number"
            placeHolder="Dosagem"
            value={ml}
            onChange={(e) => setMl(e.target.value)}
            icon={AngryIcon}
          />
        </div>

        <div className="flex mt-2 gap-1 w-96">
          <select
            className="block appearance-none  bg-white border border-green-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
            onChange={(e) => setAnimalId(e.target.value)}
          >
            <option value="">Selecione um animal</option>
            {animals.map((animal) => {
              return (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex mt-2 w-96 gap-1"></div>

        <button
          onClick={handleAddNewVaccine}
          className="w-full bg-green-600 rounded mt-2 h-12"
        >
          CADASTRAR
        </button>
      </div>
    </div>
  )
}
