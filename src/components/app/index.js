import React from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

import Header from "../header"
import UploadArea from "../upload-area"
import UploadFilesList from "../upload-files-list"

const GlobalStyle = createGlobalStyle`
    html, body{
        padding: 0;
        margin: 0
    }
`
const ContentContainer = styled.div`
    margin: auto;
    width: 100%;
    max-width: 600px;
`

class App extends React.Component{
    render(){
        return (
            <>
                <GlobalStyle></GlobalStyle>
                <Header></Header>
                <ContentContainer>
                    <UploadArea></UploadArea>
                    <UploadFilesList></UploadFilesList>
                </ContentContainer>
            </>
        )
    }
}

export default App