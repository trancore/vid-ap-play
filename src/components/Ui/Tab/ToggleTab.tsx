import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ToggleTab({ children }: Props): JSX.Element {
  const dummy = Array.from({ length: 3 }, (_, i) => i)

  return (
    <TabGroup>
      <TabList className="sticky top-[116px] flex overflow-x-scroll pb-10">
        {dummy.map((dummy, index) => (
          <Tab
            key={`tab-${index}`}
            className="w-60 cursor-pointer overflow-hidden border border-gray-500 p-4 text-ellipsis text-orange-700"
          >
            {dummy}
          </Tab>
        ))}
        <Tab className="min-w-60 cursor-pointer border-b border-gray-500 p-4 text-ellipsis">
          +
        </Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  )
}
