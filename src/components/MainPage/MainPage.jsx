import React from "react"
import Header from "../Header/Header"
import URILoaderBlock from "../URILoaderBlock/URILoaderBlock"
import UriActions from "../BoxUriActions/UriActions/UriActions"
import Decorations from "../Decorations/Decorations"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
    return (

        <div>
            <Header />
            <URILoaderBlock />
            <UriActions />
            <Decorations />

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default MainPage
