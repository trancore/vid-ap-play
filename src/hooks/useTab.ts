import { useState } from 'react'
<<<<<<< HEAD
import { ITab } from '~/types/Tab'
=======

interface Tab {
  id: number
  path: string
  active: boolean
}
>>>>>>> parent of 8dea2a4 (feature: add addTab method)

export default function useTab() {
  const [tabs, setTabs] = useState<Tab[]>()

  function getTab(id: number): Tab | undefined {
    return tabs?.find((tab) => tab.id === id)
  }

<<<<<<< HEAD
  function addTab(tab: ITab) {
    // TODO: 既存にあるTabのactiveをfalseにする

    if (tab.path === '') return

=======
  function setTab(tab: Tab) {
    if (tabs === undefined) return
>>>>>>> parent of 8dea2a4 (feature: add addTab method)
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
