import { Field } from '@headlessui/react'
import TextForm from '~/components/Common/Form/File'
import VideoCard from '~/components/Ui/Card/VideoCard'

export default function ContentTab(): JSX.Element {
  const dummy = Array.from({ length: 4 }, (_, i) => {
    return {
      src: '/src/assets/videos/dummy-video.mp4',
      fileName: `${i}-filenamefilenamefilenamefilenamefilenamefilenamefilename`,
      duration: 3600,
    }
  })
  return (
    <div className="flex flex-col gap-10">
      <Field>
        <TextForm label="パス" />
      </Field>
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
