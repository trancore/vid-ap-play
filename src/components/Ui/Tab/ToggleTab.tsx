import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import { ReactNode } from 'react'
import { getLastTextSegment } from '~/utils/format'
import { ITab } from '~/types/Tab'

interface Props {
  children: ReactNode
  tabs: ITab[]
  onClickPlusTab: () => void
}

export default function ToggleTab({
  children,
  tabs,
  onClickPlusTab,
}: Props): JSX.Element {
  return (
    <TabGroup>
      <TabList className="sticky top-[116px] flex overflow-x-scroll pb-10">
        {tabs === undefined ||
          (tabs.length > 0 &&
            tabs.map((tab, index) => (
              <Tab
                key={`tab-${index}`}
                className="w-60 cursor-pointer overflow-hidden border border-gray-500 p-4 text-ellipsis text-orange-700"
              >
                {getLastTextSegment(tab.path, '/')}
              </Tab>
            )))}
        <Tab
          className="min-w-60 cursor-pointer border-b border-gray-500 p-4 text-ellipsis"
          onClick={onClickPlusTab}
        >
          +
        </Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  )
}
