import React from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

import Header from "../header"
import UploadArea from "../upload-area"
import UploadFilesList from "../upload-files-list"
import { filesFilter } from "../../utils/select-files"
import FadeTransition from "../transitions/fade-transtion"

import { connect } from "react-redux"
import { uploadFiles } from "../../actions"

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

const DragingMask = styled.div`
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background: rgba(0,0,0,0.7);
    transition: opacity .3s;

    span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            draging: false
        }
    }

    componentDidMount(){
        window.addEventListener("paste", this.pasteFiles)
        document.addEventListener("dragend", e => e.preventDefault())
        document.addEventListener("dragover", e => e.preventDefault())
        document.addEventListener("dragleave", e => e.preventDefault())
        document.addEventListener("drop", this.dragFiles)
        document.addEventListener("dragenter", this.dragFileEnter)
    }

    uploadFiles = files => {
        //检测配置是否正确
        if (this.checkUploadConfigs()){
            this.props.uploadFiles(files)
        }
    }

    dragFileEnter = e => {
        if (this.state.draging) return

        this.setState({
            draging: true
        })
    }

    dragFileLeave = e => {
        this.setState({
            draging: false
        })
    }

    dragFiles = e => {
        e.preventDefault()
        this.setState({
            draging: false
        })

        let files = filesFilter(e.dataTransfer.files, "image/*")
        this.uploadFiles(files)
    }

    pasteFiles = e => {
        //Windows下 从系统复制的文件无法获取 QQ截图可以获取
        let files = filesFilter(e.clipboardData.files, "image/*")
        this.uploadFiles(files)
    }

    checkUploadConfigs = () => {
        let globalConfig = this.props.globalConfig
        if (!globalConfig.AK){
            alert("请输入AK")
            return false
        }

        if (!globalConfig.SK){
            alert("请输入SK")
            return false
        }

        if (!globalConfig.scope){
            alert("请输入上传的空间(scope)")
            return false
        }

        if (!globalConfig.domain){
            alert("请输入上传后URL的域名")
            return false
        }

        return true
    }

    render(){
        let state = this.state

        return (
            <>
                <GlobalStyle></GlobalStyle>
                <Header></Header>
                <ContentContainer>
                    <UploadArea></UploadArea>
                    <UploadFilesList></UploadFilesList>
                </ContentContainer>
                <FadeTransition in={state.draging} mountOnEnter unmountOnExit timeout={300}>
                    {
                        state => 
                            <DragingMask transitionStatus={state} onDragLeave={this.dragFileLeave}>
                                <span>
                                    松开鼠标，上传文件
                                </span>
                            </DragingMask> 
                    }
                </FadeTransition>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        globalConfig: state.globalConfig,
    }
}

export default connect(mapStateToProps, {uploadFiles})(App)