interface DashButtonProps {
  option: string
  currentPage: string
  onChange: () => void
}

export function DashButton({ option, currentPage, onChange }: DashButtonProps) {
  const isSelected = option === currentPage

  return (
    <button
      onClick={() => onChange()}
      className={`shadow-md p-2 bg-green-900 rounded font-alt text-gray-100 ${
        isSelected ? 'text-green-600' : ''
      } ${isSelected ? 'bg-gray-400' : ''}`}
    >
      {option}
    </button>
  )
}
