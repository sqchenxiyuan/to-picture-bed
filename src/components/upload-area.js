import React from "react"
import styled from "styled-components"
import { selectFiles, filesFilter } from "../utils/select-files"
import { connect } from "react-redux"
import { uploadFiles } from "../actions"

const UploadContainer = styled.div`
    cursor: pointer;
    position: relative;
    margin: auto;
    height: 300px;
    width: 100%;
    border: 1px dashed black;
`

const CenterTextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
`

class UploadArea extends React.Component{
    constructor(props){
        super(props)

        this.selectFiles = this.selectFiles.bind(this)
        this.dragFiles = this.dragFiles.bind(this)
        this.pasteFiles = this.pasteFiles.bind(this)
    }

    componentDidMount(){
        window.addEventListener("paste", this.pasteFiles)
    }

    componentWillUnmount(){
        window.removeEventListener("paste", this.pasteFiles)
    }

    selectFiles() {
        selectFiles("image/*").then(files => {
            this.props.uploadFiles(files)
        }).catch(err => {
            switch (err.message){
                case "ERROR_FILE_TYPE":
                    alert("文件类型错误")
                    break
                case "ERROR_SELECT_NULL_FILES":
                    alert("没有选择文件")
                    break
            }
        })
    }

    dragFiles(e){
        e.preventDefault()
        let files = filesFilter(e.dataTransfer.files, "image/*")
        this.props.uploadFiles(files)
    }

    pasteFiles(e){
        //Windows下 从系统复制的文件无法获取 QQ截图可以获取
        let files = filesFilter(e.clipboardData.files, "image/*")
        this.props.uploadFiles(files)
    }

    render(){
        let props = this.props
        let state = this.state

        return (
            <>
                <UploadContainer onClick={this.selectFiles} onDrop={this.dragFiles} 
                    onDragEnter={e => e.preventDefault()} onDragOver={e => e.preventDefault()} onDragLeave={e => e.preventDefault()}>
                    <CenterTextContainer>
                        点击选择文件或拖拽文件至此处
                    </CenterTextContainer>
                </UploadContainer>
            </>
        )
    }
}

export default connect(_ => ({}), {uploadFiles})(UploadArea)