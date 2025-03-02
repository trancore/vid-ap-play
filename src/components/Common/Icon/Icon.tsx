import { Button } from '@headlessui/react'
import Close from '~/assets/images/icons/close.svg?react'

const ICONS = {
  Close,
}

type IconName = keyof typeof ICONS
type Size = 16 | 24 | 32 | 48 | 64 | 72 | 84 | 96 | 108 | 128

interface Props {
  name: IconName
  size: Size
  color?: `#${string}`
  onClick?: () => void
}

export default function Icon({ name, size, color, onClick }: Props) {
  const Icon = ICONS[name]
  const isButton = !!onClick

  const IconElm = (
    <Icon id={name} height={size} width={size} fill={color || '#545454'} />
  )

  if (isButton) {
    return (
      <Button className="cursor-pointer" onClick={onClick}>
        {IconElm}
      </Button>
    )
  }

  return IconElm
}
