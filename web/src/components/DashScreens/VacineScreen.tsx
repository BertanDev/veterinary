import { PlusCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VaccineModal } from '../NewModals/VaccineModal'
import { api } from '@/lib/axios'
import { Infos } from '../Infos'

export default function VacineScreen() {
  const [isModalOpen, setModalOpen] = useState(false)

  const [animalId, setAnimalId] = useState('')
  const [animals, setAnimals] = useState([])

  const [vaccines, setVaccines] = useState([])

  async function getAnimals() {
    const response = await api.get('/animals')

    return response.data
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getAnimals()
      setAnimals(data)
    }

    getData()
  }, [])

  useEffect(() => {
    async function getVaccines() {
      const response = await api.get('/vaccines', {
        params: {
          animalId,
        },
      })

      return response.data
    }
    const getData = async () => {
      const data = await getVaccines()
      setVaccines(data)
    }

    getData()
  }, [animalId])

  console.log(vaccines)

  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  async function deleteVaccine(vaccineId: string) {
    await api.delete('/vaccine', {
      params: {
        vaccineId,
      },
    })

    async function getVaccines() {
      const response = await api.get('/vaccines', {
        params: {
          animalId,
        },
      })

      return response.data
    }
    const getData = async () => {
      const data = await getVaccines()
      setVaccines(data)
    }

    getData()
  }

  async function getVaccines() {
    const response = await api.get('/vaccines', {
      params: {
        animalId,
      },
    })

    setVaccines(response.data)
  }

  return (
    <div className="w-full p-10">
      <div className="flex w-full justify-between">
        <span className="font-alt text-4xl">Vacinas</span>
        <button
          onClick={handlePlusCircleClick}
          className="text-green-600 flex items-center gap-1"
        >
          <PlusCircle />
          Novo
        </button>
      </div>

      <div className="flex mt-8">
        <div className="flex flex-col gap-16">
          <Infos />
        </div>

        <div className="flex flex-col w-100 items-center w-[800px] px-10 gap-3">
          <div>
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

          <div className="flex flex-col gap-2">
            {vaccines.map((vaccine) => {
              const vaccineDate = new Date(vaccine.validate)

              const dia = String(vaccineDate.getUTCDate()).padStart(2, '0')
              const mes = String(vaccineDate.getUTCMonth() + 1).padStart(2, '0') // Os meses começam em zero, então adicionamos 1
              const ano = vaccineDate.getUTCFullYear()

              const dataFormatada = `${dia}/${mes}/${ano}`
              return (
                <div
                  key={vaccine.id}
                  className="flex border border-sky-700 rounded p-3 w-96 justify-between"
                >
                  <div className="flex">
                    <p className="border-r border-sky-700 mr-2 pr-2">
                      {vaccine.name}
                    </p>
                    <p className="border-r border-sky-700 mr-2 pr-2">
                      {vaccine.ml}ml
                    </p>
                    <p>{dataFormatada}</p>
                  </div>

                  <button onClick={() => deleteVaccine(vaccine.id)}>
                    <Trash2 className="text-red-400 " />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <VaccineModal closeModal={closeModal} getVaccines={getVaccines} />
      )}
    </div>
  )
}
