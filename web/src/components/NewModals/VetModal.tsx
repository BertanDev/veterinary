import { X, AngryIcon, User } from 'lucide-react'
import { useState } from 'react'

import { Input } from '../Input'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'
import InputMask from 'react-input-mask'

interface VetModalProps {
  closeModal: () => void
}

export function VetModal({ closeModal }: VetModalProps) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')

  async function handleAddNewVet() {
    console.log({ name, cpf, birthDate, email, phone })

    try {
      await api.post('/vet', {
        name,
        cpf,
        birthDate,
        email,
        phone,
      })

      toast.success('Veterinário adicionado')

      setName('')
      setCpf('')
      setEmail('')
      setPhone('')
      setBirthDate('')
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
            Adicione um novo veterinário
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Input
            type="text"
            placeHolder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={AngryIcon}
          />
        </div>

        <div className="flex mt-2 gap-1">
          <InputMask
            id="cpf"
            mask="999.999.999-99"
            className="pl-5 py-3 border-2 w-56 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
            placeholder="CPF"
            type="text"
            value={cpf}
            onChange={(event) => setCpf(event.target.value.replace(/\D/g, ''))}
          />

          <InputMask
            id="birth"
            mask="99/99/9999"
            className="pl-5 py-3 border-2 border-white w-40 bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
            placeholder="Data Nascimento"
            value={birthDate}
            type="text"
            onChange={(event) =>
              setBirthDate(event.target.value.replace(/\//g, ''))
            }
          />
        </div>

        <div className="flex mt-2 w-96 gap-1">
          <InputMask
            id="phone"
            mask="(99) 99999-9999"
            className="pl-5 w-40 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
            placeholder="Telefone"
            value={phone}
            type="text"
            onChange={(event) =>
              setPhone(event.target.value.replace(/\D/g, ''))
            }
          />

          <Input
            placeHolder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={User}
          />
        </div>

        <button
          onClick={handleAddNewVet}
          className="w-full bg-green-600 rounded mt-2 h-12"
        >
          CADASTRAR
        </button>
      </div>
    </div>
  )
}
