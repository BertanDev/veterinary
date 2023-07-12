import { TypeIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

interface InputProps {
  placeHolder: string
  type: 'text' | 'password' | 'number' | 'float'
  icon: typeof TypeIcon
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Input({
  placeHolder,
  type,
  icon: Icon,
  onChange,
  value,
}: InputProps) {
  return (
    <label className="relative w-96">
      <i className="absolute left-0 top-0 flex items-center justify-center h-full w-8 pl-2">
        <Icon size={32} color="#454545" />
      </i>
      <input
        type={type}
        step="0.01"
        className="w-full pl-10 pr-4 py-3 border-2 border-white bg-[#C8C8C8] outline-none placeholder-[#454545] rounded-md focus:border-green-600 focus:border-2"
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />
    </label>
  )
}
