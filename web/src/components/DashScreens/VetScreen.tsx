'use client'

import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VetModal } from '../NewModals/VetModal'
import { api } from '@/lib/axios'
import { ItemInfo } from '../ItemInfo'
import { Infos } from '../Infos'

export default function VetScreen() {
  const [vets, setVets] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  async function onDelete(id: string) {
    await api.delete('/vet', {
      params: {
        editId: id,
      },
    })

    getVets()
  }

  const getVets = async () => {
    const fetchResponsibles = await api.get('/vets')

    setVets(fetchResponsibles.data)
  }

  useEffect(() => {
    getVets()
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
        <span className="font-alt text-4xl">Veterinários</span>
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
          {vets.map((vet) => (
            <ItemInfo
              key={vet.id}
              desc={vet.name}
              id={vet.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <VetModal
          closeModal={closeModal}
          isEdit={isEdit}
          editId={editId}
          getVets={getVets}
        />
      )}
    </div>
  )
}
