import { open } from '@tauri-apps/plugin-dialog'
import { useState } from 'react'

export default function useDirectory() {
  const [directoryPath, setDirectoryPath] = useState('')

  const selectDirectory = async () => {
    const selectedDirectoryPath = await open({
      directory: true,
      multiple: false,
    })

    if (selectedDirectoryPath) {
      setDirectoryPath(selectedDirectoryPath)
    }
  }

  return { directoryPath, selectDirectory }
}
