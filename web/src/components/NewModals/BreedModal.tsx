import { X, AngryIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '../Input'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'

interface BreedModalProps {
  isEdit?: boolean
  editId?: string

  getBreeds: () => void
  closeModal: () => void
}

export function BreedModal({
  closeModal,
  isEdit,
  editId,
  getBreeds,
}: BreedModalProps) {
  const [breed, setBreed] = useState('')

  useEffect(() => {
    const fetchBreed = async () => {
      const response = await api.get('/breed', {
        params: {
          editId,
        },
      })

      return response.data
    }

    if (isEdit) {
      const getData = async () => {
        const data = await fetchBreed()
        setBreed(data.breed.description)
      }

      getData()
    }
  }, [editId, isEdit])

  async function handleEditBreed() {
    try {
      await api.put('/breed', {
        id: editId,
        description: breed,
      })

      toast.success('Raça editada')
      getBreeds()
      console.log('breed editou')
    } catch (error) {
      toast.error('Erro no servidor')
    }
  }

  async function handleAddNewBreed() {
    try {
      await api.post('/breed', {
        description: breed,
      })

      toast.success('Raça adicionada')
      getBreeds()
      setBreed('')
    } catch (error) {
      toast.error('Erro no servidor')
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
            {isEdit ? 'Editar raça' : 'Adicione uma nova raça'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeHolder="Descrição"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            icon={AngryIcon}
          />
        </div>

        <button
          onClick={isEdit ? handleEditBreed : handleAddNewBreed}
          className="w-full bg-green-600 rounded mt-2 h-12"
        >
          {isEdit ? 'SALVAR' : 'CADASTRAR'}
        </button>
      </div>
    </div>
  )
}
