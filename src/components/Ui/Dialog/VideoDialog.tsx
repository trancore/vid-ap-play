import { Dialog, DialogPanel } from '@headlessui/react'
import Icon from '~/components/Common/Icon/Icon'
import { useVideo } from '~/hooks/useVideo'
import { IFile } from '~/types/file'

interface Props {
  no: number
  src: string
  isOpen: boolean
  files: IFile[]
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}

export default function VideoDialog({
  no,
  src,
  isOpen,
  files,
  setIsOpen,
}: Props): JSX.Element {
  const { isCloseIconHidden, videoRef, currentSrc } = useVideo(no, src, files)

  function close() {
    setIsOpen(false)
  }

  return (
    <Dialog className="absolute inset-0" as="div" open={isOpen} onClose={close}>
      <DialogPanel
        transition
        className="flex h-full w-full flex-col justify-center bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
      >
        <div
          className={`absolute top-0 right-0 transition duration-500 ease-in ${isCloseIconHidden ? 'opacity-0' : 'opacity-100'}`}
        >
          <Icon name="Close" size={96} onClick={close} />
        </div>
        <video controls className="aspect-video" ref={videoRef}>
          <source src={currentSrc}></source>
        </video>
      </DialogPanel>
    </Dialog>
  )
}
