import { Dialog, DialogPanel } from '@headlessui/react'
import { useCallback, useEffect, useState } from 'react'
import Icon from '~/components/Common/Icon/Icon'

interface Props {
  src: string
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}

export default function VideoDialog({
  src,
  isOpen,
  setIsOpen,
}: Props): JSX.Element {
  const [releaseTime, setReleaseTime] = useState(0)
  const [isCloseHidden, setIsCloseHidden] = useState(false)

  function close() {
    setIsOpen(false)
  }

  const resetTimer = useCallback(() => {
    setIsCloseHidden(false)
    clearInterval(releaseTime)
    setReleaseTime(
      setInterval(() => {
        setIsCloseHidden(true)
      }, 3000),
    )
  }, [releaseTime])

  useEffect(() => {
    document.addEventListener('mousemove', resetTimer)
    document.addEventListener('keydown', resetTimer)

    return () => {
      document.removeEventListener('mousemove', resetTimer)
      document.removeEventListener('keydown', resetTimer)
    }
  }, [resetTimer, releaseTime])

  return (
    <Dialog className="absolute inset-0" as="div" open={isOpen} onClose={close}>
      <DialogPanel
        transition
        className="flex h-full w-full flex-col justify-center bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
      >
        <div
          className={`absolute top-0 right-0 transition duration-500 ease-in ${isCloseHidden ? 'opacity-0' : 'opacity-100'}`}
        >
          <Icon name="Close" size={96} onClick={close} />
        </div>
        <video controls className="aspect-video">
          <source src={src}></source>
        </video>
      </DialogPanel>
    </Dialog>
  )
}
