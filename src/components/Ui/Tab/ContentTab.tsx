import VideoCard from '~/components/Ui/Card/VideoCard'

interface Props {
  directoryPath: string
}

export default function ContentTab({ directoryPath }: Props): JSX.Element {
  const dummy = Array.from({ length: 4 }, (_, i) => {
    return {
      src: '/src/assets/videos/dummy-video.mp4',
      fileName: `${i}-filenamefilenamefilenamefilenamefilenamefilenamefilename`,
      duration: 3600,
    }
  })

  return (
    <div className="flex flex-col gap-10">
      <p>
        {directoryPath ? directoryPath : 'ディレクトリが指定されていません。'}
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-10">
        {dummy.map((dummy, index) => (
          <VideoCard
            key={`video-card-${index}`}
            src={dummy.src}
            fileName={dummy.fileName}
            duration={dummy.duration}
          />
        ))}
      </div>
    </div>
  )
}
