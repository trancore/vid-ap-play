import { Transition } from '@headlessui/react'

interface Props {
  isShow: boolean
  size?: 8 | 12 | 16
}

export default function Spinner({ isShow, size = 8 }: Props): JSX.Element {
  return (
    <Transition show={isShow}>
      <div
        className={`size-${size} animate-spin rounded-[50%] border-${size / 2} border-white border-t-blue-500`}
      ></div>
    </Transition>
  )
}
