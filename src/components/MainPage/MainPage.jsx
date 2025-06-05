import React from "react"
import Header from "../Header/Header"
import URILoaderBlock from "../URILoaderBlock/URILoaderBlock"
import UriActions from "../BoxUriActions/UriActions/UriActions"
import Decorations from "../Decorations/Decorations"

function MainPage() {
    return (

        <div>
            <Header />
            <URILoaderBlock />
            <UriActions />
            <Decorations />
        </div>
    )
}

export default MainPage
