'use client'

import { PlusCircle } from 'lucide-react'
import { InfoFrame } from '../InfoFrame'
import { useState } from 'react'
import { AnimalModal } from '../NewModals/AnimalModal'

export default function AnimalScreen() {
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
          <InfoFrame color="PRIMARY" quantity={47} text="Animais cadastrados" />
          <InfoFrame
            color="SECONDARY"
            quantity={47}
            text="Animais cadastrados"
          />
          <InfoFrame
            color="TERTIARY"
            quantity={47}
            text="Animais cadastrados"
          />
        </div>

        <div className=""></div>
      </div>
      {isModalOpen && <AnimalModal closeModal={closeModal} />}
    </div>
  )
}
