'use client'

import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ResponsibleModal } from '../NewModals/ResponsibleModal'
import { api } from '@/lib/axios'
import { ItemInfo } from '../ItemInfo'
import { Infos } from '../Infos'

export default function ResponsibleScreen() {
  const [responsibles, setResponsibles] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  const [isModalOpen, setModalOpen] = useState(false)

  async function onDelete(id: string) {
    await api.delete('/responsible', {
      params: {
        editId: id,
      },
    })

    getResponsibles()
  }

  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const getResponsibles = async () => {
    const fetchResponsibles = await api.get('/responsibles')

    setResponsibles(fetchResponsibles.data)
  }

  useEffect(() => {
    getResponsibles()
  }, [])

  async function onEdit(id: string) {
    setIsEdit(true)
    setEditId(id)
    setModalOpen(true)
  }

  return (
    <div className="w-full p-10">
      <div className="flex w-full justify-between">
        <span className="font-alt text-4xl">Responsáveis</span>
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
          {responsibles.map((responsible) => (
            <ItemInfo
              key={responsible.id}
              desc={responsible.name}
              id={responsible.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ResponsibleModal
          closeModal={closeModal}
          isEdit={isEdit}
          editId={editId}
          getResponsibles={getResponsibles}
        />
      )}
    </div>
  )
}
