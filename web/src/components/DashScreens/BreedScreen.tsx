'use client'

import { PlusCircle } from 'lucide-react'
import { InfoFrame } from '../InfoFrame'
import { useEffect, useState } from 'react'
import { BreedModal } from '../NewModals/BreedModal'
import { api } from '@/lib/axios'
import { ItemInfo } from '../ItemInfo'

export default function BreedScreen() {
  const [breeds, setBreeds] = useState([])

  const [isModalOpen, setModalOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  const getBreeds = async () => {
    const fetchBreeds = await api.get('/breeds')

    setBreeds(fetchBreeds.data)
  }

  useEffect(() => {
    getBreeds()
  }, [])

  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setIsEdit(false)
  }

  async function onDelete(id: string) {
    await api.post('/breed-delete', {
      id,
    })

    getBreeds()
  }

  async function onEdit(id: string) {
    setIsEdit(true)
    setEditId(id)
    setModalOpen(true)
  }

  return (
    <div className="w-full p-10">
      <div className="flex w-full justify-between">
        <span className="font-alt text-4xl">Raças</span>
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
          <InfoFrame color="PRIMARY" quantity={47} text="Animais cadastrados" />
          <InfoFrame
            color="SECONDARY"
            quantity={47}
            text="Responsáveis cadastrados"
          />
          <InfoFrame
            color="TERTIARY"
            quantity={47}
            text="Animais cadastrados"
          />
        </div>

        <div className="flex flex-col w-100 items-center w-[800px] px-10 gap-3">
          {breeds.map((breed) => (
            <ItemInfo
              key={breed.id}
              desc={breed.description}
              id={breed.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <BreedModal
          closeModal={closeModal}
          isEdit={isEdit}
          editId={editId}
          getBreeds={getBreeds}
        />
      )}
    </div>
  )
}
