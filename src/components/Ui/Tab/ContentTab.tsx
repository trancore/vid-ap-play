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
  onClickDeleteButton: (tabId: Pick<ITab, 'id'>['id']) => void
}

export default function ContentTab({
  tabs,
  directoryPath,
  onClickDeleteButton,
}: Props): JSX.Element {
  const [files, setFiles] = useState<IFile[]>([])
  const [currentTab, setCurrentTab] = useState<ITab>()

  const fetchVideoFiles = useCallback(async () => {
    if (!currentTab?.path) return

    const readFiles = await readDir(currentTab.path)
    const currentFiles = readFiles.map<IFile>((file) => ({
      src: convertFileSrc(currentTab.path + '/' + file.name),
      fileName: file.name,
      duration: 6000,
    }))

    setFiles(currentFiles)
  }, [currentTab])

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
    const tab = tabs.find((tab) => {
      return tab.path === directoryPath
    })

    setCurrentTab(tab)
    fetchVideoFiles()
  }, [tabs, setCurrentTab, fetchVideoFiles])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-start gap-10">
        <p>
          {currentTab?.path
            ? currentTab.path
            : 'ディレクトリが指定されていません。'}
        </p>
        {currentTab?.path && (
          <Button
            text="削除"
            onClick={() => onClickDeleteButton(currentTab.id)}
          ></Button>
        )}
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-10">{videoCards}</div>
      )}
    </div>
  )
}
