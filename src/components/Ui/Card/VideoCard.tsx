import { Button } from '@headlessui/react'
import { useState } from 'react'
import { formatDuration } from '~/utils/format'
import VideoDialog from '../Dialog/VideoDialog'

interface Props {
  src: string
  fileName: string
  duration: number
}

export default function VideoCard({
  src,
  fileName,
  duration,
}: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="max-w-80">
        <Button
          className="flex w-full flex-col items-start gap-1 hover:cursor-pointer"
          onClick={open}
        >
          <video src={src} />
          <p className="w-full overflow-hidden text-left text-ellipsis">
            {fileName}
          </p>
          <p>{formatDuration(duration)}</p>
        </Button>
      </div>
      <VideoDialog src={src} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
