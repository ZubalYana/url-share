import './App.css'
import Header from './components/Header/Header'
import UriActions from './components/BoxUriActions/UriActions/UriActions'
import Decorations from './components/Decorations/Decorations'
import URILoaderBlock from './components/URILoaderBlock/URILoaderBlock'
function App() {



    // git merge main в гілці щоб працював tailwind в інших гілках 

  return (
    <>

      <Header />

         <URILoaderBlock  />

      <UriActions />

      <Decorations />

    </>
  )
}

export default App
