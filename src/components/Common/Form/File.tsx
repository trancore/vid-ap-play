import { Description, Input, Label } from '@headlessui/react'

interface Props {
  label?: string
  description?: string
  placeholder?: string
}

export default function TextForm({
  label,
  description,
  placeholder,
}: Props): JSX.Element {
  return (
    <>
      {label && <Label className="text-sm/6">{label}</Label>}
      {description && (
        <Description className="text-sm/6">{description}</Description>
      )}
      <Input
        className="w-full rounded-lg bg-gray-200 px-3 py-1.5 text-black hover:cursor-pointer"
        type="file"
        /* @ts-expect-error ディレクトリのみを許可するにに必要なため */
        webkitdirectory=""
        placeholder={placeholder}
      />
    </>
  )
}
