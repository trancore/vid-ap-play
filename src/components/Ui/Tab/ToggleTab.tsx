import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import { ReactNode } from 'react'
import { ITab } from '~/types/Tab'
import { getLastTextSegment } from '~/utils/string'

interface Props {
  children: ReactNode
  tabs: ITab[]
  onClick: {
    tab: (tabId: Pick<ITab, 'id'>['id']) => void
    plusTab: () => void
  }
}

export default function ToggleTab({
  children,
  tabs,
  onClick,
}: Props): JSX.Element {
  return (
    <TabGroup>
      <TabList className="top-[116px] flex overflow-x-scroll pb-10">
        {tabs === undefined ||
          (tabs.length > 0 &&
            tabs.map((tab) => (
              <Tab
                key={`tab-${tab.id}`}
                className={`${tab.active && 'text-orange-700'} w-60 cursor-pointer overflow-hidden border border-gray-500 p-4 text-ellipsis`}
                onClick={() => onClick.tab(tab.id)}
              >
                {getLastTextSegment(tab.path, '/')}
              </Tab>
            )))}
        <Tab
          className="min-w-60 cursor-pointer border-b border-gray-500 p-4 text-ellipsis"
          onClick={onClick.plusTab}
        >
          +
        </Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  )
}
