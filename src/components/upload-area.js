import React from "react"
import styled from "styled-components"
import { selectFiles } from "../utils/select-files"
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
    }

    uploadFiles = files => {
        //检测配置是否正确
        if (this.checkUploadConfigs()){
            this.props.uploadFiles(files)
        }
    }

    preventDefault = e => {
        e.preventDefault()
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

    selectFiles = () => {
        selectFiles("image/*").then(files => {
            this.uploadFiles(files)
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

    render(){
        return (
            <>
                <UploadContainer onClick={this.selectFiles}>
                    <CenterTextContainer>
                        点击选择文件或拖拽文件至此处
                    </CenterTextContainer>
                </UploadContainer>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        globalConfig: state.globalConfig,
    }
}

export default connect(mapStateToProps, {uploadFiles})(UploadArea)