import './assets/css/global.css'
import Button from '~/components/Common/Button/Button'
import Layout from '~/components/Common/Layout/Layout'
import ContentTab from '~/components/Ui/Tab/ContentTab'
import ToggleTab from '~/components/Ui/Tab/ToggleTab'
import useDirectory from '~/hooks/useDirectory'
import useTab from '~/hooks/useTab'

function App() {
  const { tabs, addTab, activeTab } = useTab()
  const { directoryPath, selectDirectory } = useDirectory()

  const onClickToggleTab = {
    tab: activeTab,
    plusTab: () =>
      addTab({
        id: tabs.length + 1,
        path: directoryPath,
        active: true,
      }),
  }

  return (
    <Layout>
      <div className="my-5">
        <Button
          text="ディレクトリを指定する"
          onClick={async () => await selectDirectory()}
        />
      </div>
      <ToggleTab tabs={tabs} onClick={onClickToggleTab}>
        <ContentTab directoryPath={directoryPath} />
      </ToggleTab>
    </Layout>
  )
}

export default App
