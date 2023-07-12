'use client'

import toast from 'react-hot-toast'
import {
  X,
  User,
  Building2,
  Mail,
  KeySquare,
  Hash,
  MapIcon,
} from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import InputMask from 'react-input-mask'

import { Input } from './Input'
import { api } from '@/lib/axios'

interface RegisterModalProps {
  closeModal: () => void
}

export function RegisterModal({ closeModal }: RegisterModalProps) {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')
  const [numero, setNumero] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    if (
      name === '' ||
      cnpj === '' ||
      address === '' ||
      numero === '' ||
      state === '' ||
      city === '' ||
      email === '' ||
      password === ''
    ) {
      toast.error('Informe todos os campos')
      return
    }

    try {
      await api.post('/clinic', {
        name,
        cnpj: Number(cnpj),
        state,
        city,
        email,
        password,
        address,
      })

      toast.success('Clínica criada')
    } catch (error) {
      toast.error('Erro ao cadastrar')
    }
  }

  // Select IBGE
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [estadoSelecionado, setEstadoSelecionado] = useState('')

  const handleEstadoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const estadoSelecionado = event.target.value
    setEstadoSelecionado(estadoSelecionado)
    const estadoNome = event.target.options[event.target.selectedIndex].text
    setState(estadoNome)

    if (estadoSelecionado) {
      // Carregar as cidades do estado selecionado da API do IBGE
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`,
      )
        .then((response) => response.json())
        .then((data) => setCidades(data))
        .catch((error) => console.error(error))
    } else {
      setCidades([])
    }
  }

  useEffect(() => {
    // Carregar os estados da API do IBGE ao montar o componente
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 flex flex-col">
        <div className="flex w-full justify-between mb-3">
          <button onClick={closeModal}>
            <X className="w-6 h-6 text-red-600" />
          </button>

          <p className="font-alt text-xl text-[#32B18B] font-bold">
            Cadaste sua clínica
          </p>
        </div>

        <div className="flex">
          <Input
            placeHolder="Nome"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            icon={User}
          />

          <label className="relative">
            <i className="absolute left-0 top-0 flex items-center justify-center h-full w-8 pl-2">
              <Building2 size={32} color="#454545" />
            </i>
            <InputMask
              id="cnpj"
              mask="99.999.999/9999-99"
              className="pl-10 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(event) =>
                setCnpj(event.target.value.replace(/\D/g, ''))
              }
            />
          </label>
        </div>

        <div className="mt-2 flex">
          <Input
            placeHolder="Endereço"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            icon={MapIcon}
          />

          <div className="flex w-[238px] justify-end">
            <Input
              placeHolder="Numero"
              type="numeric"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              icon={Hash}
            />
          </div>
        </div>

        <div className="flex mt-3 gap-2">
          <select
            id="estado"
            value={estadoSelecionado}
            onChange={handleEstadoChange}
            className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 border-green-800"
          >
            <option value="" className="text-gray-900">
              Selecione um estado
            </option>
            {estados.map((estado: { id: string; nome: string }) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>

          <select
            id="cidade"
            onChange={(event) => setCity(event.target.value)}
            className="block w-full p-2 border border-green-800 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            disabled={!estadoSelecionado}
          >
            <option value="" className="text-gray-900">
              Selecione um estado primeiro
            </option>
            {cidades.map((cidade: { id: string; nome: string }) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex mt-3">
          <Input
            placeHolder="Email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            icon={Mail}
          />

          <div className="flex w-[238px] justify-end">
            <Input
              placeHolder="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              icon={KeySquare}
            />
          </div>
        </div>

        <div className="mt-3">
          <button
            onClick={handleSubmit}
            className="w-full p-4 bg-[#32B18B] font-alt text-gray-200 rounded-md"
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  )
}
