import './assets/css/global.css'
import Layout from '~/components/Common/Layout/Layout'
import ContentTab from '~/components/Ui/Tab/ContentTab'
import ToggleTab from '~/components/Ui/Tab/ToggleTab'

function App() {
  return (
    <Layout>
      <ToggleTab>
        <ContentTab></ContentTab>
      </ToggleTab>
    </Layout>
  )
}

export default App
