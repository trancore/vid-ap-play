import { convertFileSrc } from '@tauri-apps/api/core'
import { readDir } from '@tauri-apps/plugin-fs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import VideoCard from '~/components/Ui/Card/VideoCard'

interface IFile {
  src: string
  fileName: string
  duration: number
}
interface Props {
  directoryPath: string
}

export default function ContentTab({ directoryPath }: Props): JSX.Element {
  const [files, setFiles] = useState<IFile[]>([])

  const fetchVideoFiles = useCallback(async () => {
    const readFiles = await readDir(directoryPath)
    const currentFiles = readFiles.map<IFile>((file) => ({
      src: convertFileSrc(directoryPath + '/' + file.name),
      fileName: file.name,
      duration: 6000,
    }))

    setFiles(currentFiles)
  }, [directoryPath])

  const videoCards = useMemo(() => {
    return files.map((file, index) => (
      <VideoCard
        key={`video-card-${index}`}
        src={file.src}
        fileName={file.fileName}
        duration={file.duration}
      />
    ))
  }, [files])

  useEffect(() => {
    if (directoryPath === '') return
    fetchVideoFiles()
  }, [directoryPath, fetchVideoFiles])

  return (
    <div className="flex flex-col gap-10">
      <p>
        {directoryPath ? directoryPath : 'ディレクトリが指定されていません。'}
      </p>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-10">{videoCards}</div>
      )}
    </div>
  )
}
