'use client'

import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { DashButton } from '@/components/DashButton'
import { InitialScreen } from '@/components/DashScreens/InitialScreen'
import AnimalScreen from '@/components/DashScreens/AnimalScreen'
import ResponsibleScreen from '@/components/DashScreens/ResponsibleScreen'
import BreedScreen from '@/components/DashScreens/BreedScreen'
import AnimalTypeScreen from '@/components/DashScreens/AnimalTypeScreen'
import VacineScreen from '@/components/DashScreens/VacineScreen'
import VetScreen from '@/components/DashScreens/VetScreen'
import SchedulingScreen from '@/components/DashScreens/SchedulingScreen'
import FinancialScreen from '@/components/DashScreens/FinancialScreen'
import WalletTypeScreen from '@/components/DashScreens/WalletTypeScreen'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('INICIO')

  const token = Cookie.get('auth_token') ?? ''

  const { name }: { name: string } = jwtDecode(token)

  const router = useRouter()

  function handleLogOut() {
    Cookie.remove('auth_token')

    router.push('/')
  }

  return (
    <div className="h-screen w-screen bg-gray-300 flex">
      <div className="h-full w-1/4 bg-green-600 flex flex-col gap-5 p-2">
        <div className="flex mb-2 p-2 gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <LogOut
              className="rotate-180 cursor-pointer"
              onClick={() => handleLogOut()}
            />
            <h1 className="font-alt text-xl">{name}</h1>
          </div>

          <div className="flex">
            <DashButton
              option="INICIO"
              currentPage={currentPage}
              onChange={() => setCurrentPage('INICIO')}
            />
          </div>
        </div>

        <DashButton
          option="ANIMAIS"
          currentPage={currentPage}
          onChange={() => setCurrentPage('ANIMAIS')}
        />
        <DashButton
          option="RESPONSÁVEL"
          currentPage={currentPage}
          onChange={() => setCurrentPage('RESPONSÁVEL')}
        />
        <DashButton
          option="RAÇA ANIMAL"
          currentPage={currentPage}
          onChange={() => setCurrentPage('RAÇA ANIMAL')}
        />
        <DashButton
          option="TIPO ANIMAL"
          currentPage={currentPage}
          onChange={() => setCurrentPage('TIPO ANIMAL')}
        />
        <DashButton
          option="VACINAS"
          currentPage={currentPage}
          onChange={() => setCurrentPage('VACINAS')}
        />
        <DashButton
          option="VETERINÁRIOS"
          currentPage={currentPage}
          onChange={() => setCurrentPage('VETERINÁRIOS')}
        />
        <DashButton
          option="AGENDAMENTOS"
          currentPage={currentPage}
          onChange={() => setCurrentPage('AGENDAMENTOS')}
        />

        <div className="border-b border-gray-100"></div>

        <DashButton
          option="FINANCEIRO"
          currentPage={currentPage}
          onChange={() => setCurrentPage('FINANCEIRO')}
        />
        <DashButton
          option="TIPO CARTEIRA"
          currentPage={currentPage}
          onChange={() => setCurrentPage('TIPO CARTEIRA')}
        />
      </div>

      <div className="h-full w-full flex">
        {currentPage === 'INICIO' && <InitialScreen />}
        {currentPage === 'ANIMAIS' && <AnimalScreen />}
        {currentPage === 'RESPONSÁVEL' && <ResponsibleScreen />}
        {currentPage === 'RAÇA ANIMAL' && <BreedScreen />}
        {currentPage === 'TIPO ANIMAL' && <AnimalTypeScreen />}
        {currentPage === 'VACINAS' && <VacineScreen />}
        {currentPage === 'VETERINÁRIOS' && <VetScreen />}
        {currentPage === 'AGENDAMENTOS' && <SchedulingScreen />}
        {currentPage === 'FINANCEIRO' && <FinancialScreen />}
        {currentPage === 'TIPO CARTEIRA' && <WalletTypeScreen />}
      </div>
    </div>
  )
}
