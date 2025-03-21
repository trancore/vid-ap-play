import { Dialog, DialogPanel } from '@headlessui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from '~/components/Common/Icon/Icon'
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
  const [releaseTime, setReleaseTime] = useState(0)
  const [isCloseHidden, setIsCloseHidden] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const videoRef = useRef<HTMLVideoElement | null>(null)

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
  const handleVideoEnded = useCallback(() => {
    if (!videoRef.current) return

    const currentFile = files[no + 1] === undefined ? files[no + 1] : files[0]
    setCurrentSrc(currentFile.src)
    videoRef.current.src = currentFile.src
    videoRef.current.play()
  }, [files, no])

  useEffect(() => {
    document.addEventListener('mousemove', resetTimer)
    document.addEventListener('keydown', resetTimer)

    return () => {
      document.removeEventListener('mousemove', resetTimer)
      document.removeEventListener('keydown', resetTimer)
    }
  }, [resetTimer])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.addEventListener('ended', handleVideoEnded)

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded)
    }
  }, [videoRef.current?.src, handleVideoEnded])

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
        <video controls className="aspect-video" ref={videoRef}>
          <source src={currentSrc}></source>
        </video>
      </DialogPanel>
    </Dialog>
  )
}
