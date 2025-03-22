import { load } from '@tauri-apps/plugin-store'

interface IStore {
  files: {
    id: string
    path: string
  }[]
}

const stores = await load('stores.json', { autoSave: true })

export default function useStores() {
  async function getStores(key: keyof IStore) {
    return await stores.get<IStore[typeof key]>(key)
  }

  async function saveStores(key: keyof IStore, data: IStore[typeof key]) {
    await stores.set(key, data)
    await stores.save()
  }

  return { getStores, saveStores }
}
