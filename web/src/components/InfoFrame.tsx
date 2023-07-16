interface InfoFrameProps {
  quantity: number
  text: string
  color: 'PRIMARY' | 'SECONDARY' | 'TERTIARY'
}

export function InfoFrame({ color, quantity, text }: InfoFrameProps) {
  return (
    <div
      className={`p-2 rounded-lg bg-white flex items-center flex-col justify-center border w-64 ${
        color === 'PRIMARY'
          ? 'bg-green-700'
          : color === 'SECONDARY'
          ? 'bg-blue-400'
          : 'bg-slate-400'
      }`}
    >
      <span className="font-alt text-7xl">{quantity}</span>
      <p className="font-alt">{text}</p>
    </div>
  )
}
