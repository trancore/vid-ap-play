import { useState } from 'react'

interface Tab {
  id: number
  path: string
  active: boolean
}

export default function useTab() {
  const [tabs, setTabs] = useState<Tab[]>()

  function getTab(id: number): Tab | undefined {
    return tabs?.find((tab) => tab.id === id)
  }

  function setTab(tab: Tab) {
    if (tabs === undefined) return
    const currentTabs = structuredClone(tabs)
    currentTabs.push({
      id: currentTabs.length + 1,
      path: tab.path,
      active: tab.active,
    })
    setTabs(currentTabs)
  }

  return { tabs, setTabs, getTab, setTab }
}
