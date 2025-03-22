import { useCallback, useEffect, useRef, useState } from 'react'
import { IFile } from '~/types/file'

export function useVideo(no: number, src: string, files: IFile[]) {
  const [releaseTime, setReleaseTime] = useState(0)
  const [isCloseIconHidden, setIsCloseIconHidden] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const resetTimer = useCallback(() => {
    setIsCloseIconHidden(false)
    clearInterval(releaseTime)
    setReleaseTime(
      setInterval(() => {
        setIsCloseIconHidden(true)
      }, 3000),
    )
  }, [releaseTime])
  const handleVideoEnded = useCallback(() => {
    if (!videoRef.current) return

    const currentFile = files[no + 1] === undefined ? files[0] : files[no + 1]
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

    videoElement.volume = 0.5

    videoElement.addEventListener('ended', handleVideoEnded)

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded)
    }
  }, [videoRef.current?.src, handleVideoEnded])

  return { isCloseIconHidden, videoRef, currentSrc }
}
