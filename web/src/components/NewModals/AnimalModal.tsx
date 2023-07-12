import { X } from 'lucide-react'
import { Input } from '../Input'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'

interface AnimalModalProps {
  closeModal: () => void
}

export function AnimalModal({ closeModal }: AnimalModalProps) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(Number)
  const [height, setHeight] = useState(Number)
  const [breedId, setBreedId] = useState('')
  const [animalTypeId, setAnimalTypeId] = useState('')
  const [responsibleId, setResponsibleId] = useState('')

  const [breeds, setBreeds] = useState([])
  const [animalTypes, setAnimalTypes] = useState([])
  const [responsibles, setResponsibles] = useState([])

  useEffect(() => {
    const getBreeds = async () => {
      const fetchBreeds = await api.get('/breeds')

      setBreeds(fetchBreeds.data)
    }

    const getAnimalTypes = async () => {
      const fetchAnimalTypes = await api.get('/animaltypes')

      setAnimalTypes(fetchAnimalTypes.data)
    }

    const getResponsibles = async () => {
      const fetchResponsibles = await api.get('/responsibles')

      setResponsibles(fetchResponsibles.data)
    }

    getResponsibles()
    getAnimalTypes()
    getBreeds()
  }, [])

  async function handleAddNewAnimal() {
    try {
      await api.post('/animal', {
        weight,
        height,
        name,
        breedId,
        animalTypeId,
        responsibleId,
      })

      toast.success('Animal cadastrado')
    } catch (error) {
      toast.error('Erro ao cadastrar animal')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 flex flex-col">
        <div className="flex w-full justify-between mb-3">
          <button onClick={closeModal}>
            <X className="w-6 h-6 text-red-600" />
          </button>

          <p className="font-alt text-xl text-[#32B18B] font-bold">
            Cadaste um novo Animal
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Input
              icon={X}
              onChange={(e) => setName(e.target.value)}
              placeHolder="Nome"
              type="text"
              value={name}
            />
          </div>

          <div className="flex gap-2 w-[500px]">
            <Input
              icon={X}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              placeHolder="Peso"
              type="number"
              value={weight.toString()}
            />

            <Input
              icon={X}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              placeHolder="Altura"
              type="number"
              value={height.toString()}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="block appearance-none w-1/2 bg-white border border-green-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setBreedId(e.target.value)}
            >
              <option value="">Selecione uma raça</option>
              {breeds.map((breed) => {
                return (
                  <option key={breed.id} value={breed.id}>
                    {breed.description}
                  </option>
                )
              })}
            </select>

            <select
              className="block appearance-none w-1/2 bg-white border border-green-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setAnimalTypeId(e.target.value)}
            >
              <option value="">Selecione um tipo</option>
              {animalTypes.map((animalType) => {
                return (
                  <option key={animalType.id} value={animalType.id}>
                    {animalType.description}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <select
              className="block appearance-none w-full border-green-400 bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setResponsibleId(e.target.value)}
            >
              <option value="">Selecione um responsável</option>
              {responsibles.map((responsible) => {
                return (
                  <option key={responsible.id} value={responsible.id}>
                    {responsible.name} -{' '}
                    {responsible.cpf.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      '$1.$2.$3-$4',
                    )}
                  </option>
                )
              })}
            </select>
          </div>

          <button
            onClick={handleAddNewAnimal}
            className="w-full bg-green-600 rounded h-10"
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  )
}
