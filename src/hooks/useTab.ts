import { useState } from 'react'
import { ITab } from '~/types/Tab'

export default function useTab() {
  const [tabs, setTabs] = useState<ITab[]>([])

  function getTab(id: number): ITab | undefined {
    return tabs?.find((tab) => tab.id === id)
  }

  function addTab(tab: ITab) {
    // TODO: 既存にあるTabのactiveをfalseにする

    if (tab.path === '') return

    const currentTabs = structuredClone(tabs)
    currentTabs.push({
      id: currentTabs.length + 1,
      path: tab.path,
      active: tab.active,
    })
    setTabs(currentTabs)
  }

  return { tabs, setTabs, getTab }
}
