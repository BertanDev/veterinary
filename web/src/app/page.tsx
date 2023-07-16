'use client'

import Image from 'next/image'
import toast from 'react-hot-toast'
import Cookie from 'js-cookie'

import vetImage from '../assets/veterinario.png'
import { PlusCircle, Mail } from 'lucide-react'
import { Input } from '@/components/Input'
import { useState } from 'react'
import { RegisterModal } from '@/components/RegisterModal'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isModalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  async function handleLogin() {
    try {
      const response = await api.post('/auth', {
        email,
        password,
      })

      Cookie.set('auth_token', response.data.token, {
        expires: 60 * 60 * 24 * 30,
      })
      router.push('/dashboard')
      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
    } catch (error) {
      toast.error('Confira suas credenciais')
    }
  }

  const handlePlusCircleClick = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <main className="h-screen w-full flex">
      <div className="w-6/12 bg-white flex flex-col justify-center items-center h-full">
        <Image src={vetImage} alt="veterinario" width={150} />
        <p className="font-alt text-[#32B18B] text-5xl mt-4">Vet gen</p>
        <p className="text-[#32B18B] font-sans font-bold mt-3">
          A solução completa para sua clínica veterinária!
        </p>

        <button
          onClick={handlePlusCircleClick}
          className="flex justify-center cursor-pointer"
        >
          <PlusCircle className="bottom-2 fixed text-[#32B18B]" />
        </button>
      </div>

      <div className="w-6/12 flex flex-col justify-center items-center bg-[#32B18B] gap-4">
        <h1 className="font-alt text-white text-4xl">Realize seu Login</h1>
        <Input
          placeHolder="Digite seu email..."
          type="text"
          icon={Mail}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          placeHolder="Digite sua senha..."
          type="password"
          icon={Mail}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button
          onClick={handleLogin}
          className="bg-white py-3 px-7 rounded font-alt text-[#32B18B] w-96 hover:bg-green-500 hover:text-white transition"
        >
          ENTRAR
        </button>
        <span className="text-gray-500 text-sm cursor-pointer">
          Problemas com suas credenciais?
        </span>
      </div>

      {isModalOpen && <RegisterModal closeModal={closeModal} />}
    </main>
  )
}
