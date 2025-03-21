import { Button } from '@headlessui/react'
import { useState } from 'react'
import VideoDialog from '~/components/Ui/Dialog/VideoDialog'
import { IFile } from '~/types/file'
import { formatDuration } from '~/utils/format'

interface Props {
  no: number
  files: IFile[]
  file: IFile
}

export default function VideoCard({ no, files, file }: Props): JSX.Element {
  const { src, fileName, duration } = file
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
      <VideoDialog
        no={no}
        src={src}
        isOpen={isOpen}
        files={files}
        setIsOpen={setIsOpen}
      />
    </>
  )
}
