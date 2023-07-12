import { X, User } from 'lucide-react'
import { useState } from 'react'
import InputMask from 'react-input-mask'

import { Input } from '../Input'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'

interface ResponsibleModalProps {
  closeModal: () => void
}

export function ResponsibleModal({ closeModal }: ResponsibleModalProps) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')

  async function handleAddNewResponsible() {
    console.log({
      name,
      cpf,
      email,
      phone,
      birthDate,
    })
    try {
      await api.post('/responsible', {
        name,
        cpf,
        email,
        phone,
        birthDate,
      })

      toast.success('Responsável criado')
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
            Cadaste um novo Responsável
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <Input
              placeHolder="nome"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              icon={User}
            />
          </div>

          <div className="flex gap-2">
            <InputMask
              id="cpf"
              mask="999.999.999-99"
              className="pl-10 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
              placeholder="CPF"
              type="text"
              value={cpf}
              onChange={(event) =>
                setCpf(event.target.value.replace(/\D/g, ''))
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

          <div className="flex gap-2">
            <InputMask
              id="phone"
              mask="(99) 99999-9999"
              className="pl-10 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
              placeholder="Telefone"
              value={phone}
              type="text"
              onChange={(event) =>
                setPhone(event.target.value.replace(/\D/g, ''))
              }
            />

            <InputMask
              id="birth"
              mask="99/99/9999"
              className="pl-10 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
              placeholder="Data Nascimento"
              value={birthDate}
              type="text"
              onChange={(event) =>
                setBirthDate(event.target.value.replace(/\//g, ''))
              }
            />

            <button
              onClick={handleAddNewResponsible}
              className="w-full bg-green-600 rounded"
            >
              CADASTRAR
            </button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  )
}
