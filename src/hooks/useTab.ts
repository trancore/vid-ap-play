import { useCallback, useEffect, useState } from 'react'
import useStores from '~/hooks/useStores'
import { ITab } from '~/types/Tab'

export default function useTab() {
  const { getStores, saveStores } = useStores()
  const [tabs, setTabs] = useState<ITab[]>([])

  const fetchStore = useCallback(async () => {
    const filesStore = await getStores('files')

    setTabs(
      filesStore?.map((file, index) => ({
        id: file.id,
        path: file.path,
        active: index === 0 ? true : false,
      })) || [],
    )
  }, [])

  useEffect(() => {
    fetchStore()
  }, [fetchStore])

  function getTab(id: string): ITab | undefined {
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
    currentTabs.push(tab)
    setTabs(currentTabs)
    saveStores('files', currentTabs)
  }

  function activeTab(tabId: Pick<ITab, 'id'>['id']) {
    const updatedTabs: ITab[] = structuredClone(tabs).map((tab) => ({
      id: tab.id,
      path: tab.path,
      active: tabId === tab.id,
    }))

    setTabs(updatedTabs)
  }

  function deleteTab(tabId: Pick<ITab, 'id'>['id']) {
    const updatedTabs: ITab[] = structuredClone(tabs).filter(
      (tab) => tab.id !== tabId,
    )

    setTabs(updatedTabs)
    saveStores('files', updatedTabs)
  }

  return { tabs, getTab, addTab, activeTab, deleteTab }
}
