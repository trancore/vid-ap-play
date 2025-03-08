import { Button as HeaadlessButton } from '@headlessui/react'

interface Props {
  text: string
  onClick: () => void
}

export default function Button({ text, onClick }: Props): JSX.Element {
  return (
    <HeaadlessButton
      className="w-fit rounded-lg bg-gray-200 px-3 py-1.5 text-black hover:cursor-pointer"
      onClick={onClick}
    >
      {text}
    </HeaadlessButton>
  )
}
