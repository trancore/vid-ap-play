import { Transition } from '@headlessui/react'

interface Props {
  isShow: boolean
}

export default function Spinner({ isShow }: Props): JSX.Element {
  return (
    <Transition show={isShow}>
      <div
        className={`size-8 animate-spin rounded-[50%] border-4 border-white border-t-blue-500`}
      ></div>
    </Transition>
  )
}
