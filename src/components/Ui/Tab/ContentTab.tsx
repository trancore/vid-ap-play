import { convertFileSrc } from '@tauri-apps/api/core'
import { readDir } from '@tauri-apps/plugin-fs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '~/components/Common/Button/Button'
import VideoCard from '~/components/Ui/Card/VideoCard'
import { ITab } from '~/types/Tab'
import { IFile } from '~/types/file'

interface Props {
  tabs: ITab[]
  onClickDeleteButton: (tabId: Pick<ITab, 'id'>['id']) => void
}

export default function ContentTab({
  tabs,
  onClickDeleteButton,
}: Props): JSX.Element {
  const [files, setFiles] = useState<IFile[]>([])
  const [currentTab, setCurrentTab] = useState<ITab>()

  const fetchVideoFiles = useCallback(async () => {
    if (!currentTab?.path || !currentTab?.active) return

    const readFiles = await readDir(currentTab.path)
    const currentFiles = readFiles.map<IFile>((file) => ({
      src: convertFileSrc(currentTab.path + '/' + file.name),
      fileName: file.name,
      duration: 6000,
    }))

    setFiles(currentFiles)
  }, [currentTab, setFiles])

  const videoCards = useMemo(() => {
    return files.map((file, index, self) => (
      <VideoCard
        key={`video-card-${index}`}
        no={index}
        files={self}
        file={file}
      />
    ))
  }, [files])

  useEffect(() => {
    const tab = tabs.find((tab) => tab.active)

    if (!tab) return

    setCurrentTab(tab)
    fetchVideoFiles()
  }, [tabs, currentTab])

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
