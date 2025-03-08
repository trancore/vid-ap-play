import { useState } from 'react'
import { ITab } from '~/type/Tab'

export default function useTab() {
  const [tabs, setTabs] = useState<ITab[]>([])

  function getTab(id: number): ITab | undefined {
    return tabs?.find((tab) => tab.id === id)
  }

  function addTab(tab: ITab) {
    const currentTabs = structuredClone(tabs)
    currentTabs.push(tab)
    setTabs(currentTabs)
  }

  return { tabs, getTab, addTab }
}
