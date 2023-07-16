'use client'

import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimalTypeModal } from '../NewModals/AnimalTypeModal'
import { api } from '@/lib/axios'
import { ItemInfo } from '../ItemInfo'
import { Infos } from '../Infos'

export default function AnimalTypeScreen() {
  const [animalTypes, setAnimalTypes] = useState([])

  const [isModalOpen, setModalOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  const getAnimalTypes = async () => {
    const fetchAnimalTypes = await api.get('/animaltypes')

    setAnimalTypes(fetchAnimalTypes.data)
  }

  useEffect(() => {
    getAnimalTypes()
  }, [])

  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setIsEdit(false)
  }

  async function onDelete(id: string) {
    await api.delete('/animaltype', {
      params: {
        editId: id,
      },
    })

    getAnimalTypes()
  }

  async function onEdit(id: string) {
    setIsEdit(true)
    setEditId(id)
    setModalOpen(true)
  }

  return (
    <div className="w-full p-10">
      <div className="flex w-full justify-between">
        <span className="font-alt text-4xl">Tipos de animal</span>
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
          {animalTypes.map((animalType) => (
            <ItemInfo
              key={animalType.id}
              desc={animalType.description}
              id={animalType.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <AnimalTypeModal
          closeModal={closeModal}
          isEdit={isEdit}
          editId={editId}
          getAnimalTypes={getAnimalTypes}
        />
      )}
    </div>
  )
}
