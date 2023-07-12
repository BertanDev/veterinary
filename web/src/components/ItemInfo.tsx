'use client'

import { Pencil, Trash2 } from 'lucide-react'

interface ItemInfoProps {
  desc: string
  id: string

  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function ItemInfo({ desc, id, onDelete, onEdit }: ItemInfoProps) {
  return (
    <div className="flex items-center w-full justify-between p-3 rounded border border-green-700 bg-gray-50">
      <p className="font-alt text-lg">{desc}</p>
      <div className="flex gap-2">
        <Pencil
          className="text-blue-700 cursor-pointer"
          onClick={() => onEdit(id)}
        />
        <Trash2
          className="text-red-700 cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  )
}
