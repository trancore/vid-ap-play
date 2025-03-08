import { useState } from 'react'
import { ITab } from '~/types/Tab'

export default function useTab() {
  const [tabs, setTabs] = useState<ITab[]>([])

  function getTab(id: number): ITab | undefined {
    return tabs?.find((tab) => tab.id === id)
  }

  function addTab(tab: ITab) {
    if (tab.path === '') return
    if (tabs.find((currentTab) => currentTab.path === tab.path)) return

    const currentTabs: ITab[] = structuredClone(tabs).map((tab) => ({
      id: tab.id,
      path: tab.path,
      active: false,
    }))
    currentTabs.push({
      id: currentTabs.length + 1,
      path: tab.path,
      active: tab.active,
    })
    setTabs(currentTabs)
  }

  return { tabs, getTab, addTab }
}
