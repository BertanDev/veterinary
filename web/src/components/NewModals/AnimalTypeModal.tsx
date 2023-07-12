import { X, AngryIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '../Input'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'

interface AnimalTypeModalProps {
  isEdit?: boolean
  editId?: string

  getAnimalTypes: () => void
  closeModal: () => void
}

export function AnimalTypeModal({
  closeModal,
  getAnimalTypes,
  editId,
  isEdit,
}: AnimalTypeModalProps) {
  const [animaltype, setAnimalType] = useState('')

  useEffect(() => {
    const fetchAnimalType = async () => {
      const response = await api.get('/animaltype', {
        params: {
          editId,
        },
      })

      return response.data
    }

    if (isEdit) {
      const getData = async () => {
        const data = await fetchAnimalType()
        setAnimalType(data.animaltype.description)
      }

      getData()
    }
  }, [editId, isEdit])

  async function handleEditAnimalType() {
    try {
      await api.put('/animaltype', {
        id: editId,
        description: animaltype,
      })

      toast.success('Tipo editado')
      getAnimalTypes()
      console.log('fdfds')
    } catch (error) {
      toast.error('Erro no servidor')
    }
  }

  async function handleAddNewAnimalType() {
    try {
      await api.post('/animaltype', {
        description: animaltype,
      })

      toast.success('Tipo adicionado')
      getAnimalTypes()
      setAnimalType('')
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
            {isEdit ? 'Editar tipo' : 'Adicione um novo tipo'}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeHolder="Descrição"
            value={animaltype}
            onChange={(e) => setAnimalType(e.target.value)}
            icon={AngryIcon}
          />
        </div>

        <button
          onClick={isEdit ? handleEditAnimalType : handleAddNewAnimalType}
          className="w-full bg-green-600 rounded mt-2 h-12"
        >
          {isEdit ? 'SALVAR' : 'CADASTRAR'}
        </button>
      </div>
    </div>
  )
}
