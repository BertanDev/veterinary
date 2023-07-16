'use client'

import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimalModal } from '../NewModals/AnimalModal'
import { api } from '@/lib/axios'
import { ItemInfo } from '../ItemInfo'
import { Infos } from '../Infos'

export default function AnimalScreen() {
  const [animals, setAnimals] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  async function onDelete(id: string) {
    await api.delete('/animal', {
      params: {
        editId: id,
      },
    })

    getAnimals()
  }

  const getAnimals = async () => {
    const fetchAnimals = await api.get('/animals')

    setAnimals(fetchAnimals.data)
  }

  useEffect(() => {
    getAnimals()
  }, [])

  async function onEdit(id: string) {
    setIsEdit(true)
    setEditId(id)
    setModalOpen(true)
  }

  const [isModalOpen, setModalOpen] = useState(false)
  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="w-full p-10">
      <div className="flex w-full justify-between">
        <span className="font-alt text-4xl">Animais</span>
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
          {animals.map((animal) => (
            <ItemInfo
              key={animal.id}
              desc={animal.name}
              id={animal.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <AnimalModal
          closeModal={closeModal}
          isEdit={isEdit}
          editId={editId}
          getAnimals={getAnimals}
        />
      )}
    </div>
  )
}
