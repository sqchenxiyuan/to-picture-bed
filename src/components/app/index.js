import React from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

import Header from "../header"

const GlobalStyle = createGlobalStyle`
    html, body{
        padding: 0;
        margin: 0
    }
`

class App extends React.Component{
    render(){
        return (
            <>
                <GlobalStyle></GlobalStyle>
                <Header></Header>
            </>
        )
    }
}

export default App