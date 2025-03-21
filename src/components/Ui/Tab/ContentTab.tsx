import { convertFileSrc } from '@tauri-apps/api/core'
import { readDir } from '@tauri-apps/plugin-fs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '~/components/Common/Button/Button'
import VideoCard from '~/components/Ui/Card/VideoCard'
import { ITab } from '~/types/Tab'

interface IFile {
  src: string
  fileName: string
  duration: number
}
interface Props {
  tabs: ITab[]
  directoryPath: string
}

export default function ContentTab({
  tabs,
  directoryPath,
}: Props): JSX.Element {
  const [files, setFiles] = useState<IFile[]>([])
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState('')

  const fetchVideoFiles = useCallback(async () => {
    const readFiles = await readDir(currentDirectoryPath)
    const currentFiles = readFiles.map<IFile>((file) => ({
      src: convertFileSrc(currentDirectoryPath + '/' + file.name),
      fileName: file.name,
      duration: 6000,
    }))

    setFiles(currentFiles)
  }, [currentDirectoryPath])

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
    const path = tabs.find((tab) => tab.active)?.path
    setCurrentDirectoryPath(path === undefined ? directoryPath : path)
    if (currentDirectoryPath === '') return
    fetchVideoFiles()
  }, [tabs, currentDirectoryPath, setCurrentDirectoryPath, fetchVideoFiles])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-start gap-10">
        <p>
          {currentDirectoryPath
            ? currentDirectoryPath
            : 'ディレクトリが指定されていません。'}
        </p>
        <Button text="削除" onClick={() => {}}></Button>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-10">{videoCards}</div>
      )}
    </div>
  )
}
