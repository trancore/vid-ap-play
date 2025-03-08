import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import { ReactNode } from 'react'
import useTab from '~/hooks/useTab'

interface Props {
  children: ReactNode
}

export default function ToggleTab({ children }: Props): JSX.Element {
  const { tabs: currentTabs } = useTab()

  return (
    <TabGroup>
      <TabList className="sticky top-[116px] flex overflow-x-scroll pb-10">
        {currentTabs === undefined ||
          (currentTabs.length > 0 &&
            currentTabs.map((tab, index) => (
              <Tab
                key={`tab-${index}`}
                className="w-60 cursor-pointer overflow-hidden border border-gray-500 p-4 text-ellipsis text-orange-700"
              >
                {tab.path}
              </Tab>
            )))}
        <Tab className="min-w-60 cursor-pointer border-b border-gray-500 p-4 text-ellipsis">
          +
        </Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  )
}
