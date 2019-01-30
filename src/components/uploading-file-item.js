import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { getBucketUploadHost, uploadFile } from "../interfaces/bukect"

const ImageContainer = styled.div`
    width:100%;
    text-align: center;

    img{
        width: 100%;
        max-width: 400px;
    }
`

const Progress = styled.div`
    width:${props => props.progress * 100 + "%"};
    background: red;
    height: ${props => { return props.progress === 1 ? "40px" : "20px" }};
    transition: width .3s ease-out, height .3s ease-out;
`


class UploadingFileItem extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            imageData: "",
            porgress: 0
        }

        this.imageUploadProgress = this.imageUploadProgress.bind(this)
    }

    componentDidMount(){
        let uploadingFile = this.props.uploadingFile
        let file = uploadingFile.file
        
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.addEventListener("load", _ => {
            let data = fileReader.result
            this.setState({
                imageData: data
            })
        })

        this.uploadFile()
    }

    uploadFile(){
        let uploadingFile = this.props.uploadingFile
        let AK = this.props.AK
        let SK = this.props.SK
        let scope = this.props.scope

        uploadFile({
            scope: scope,
            deadline: parseInt(Date.now() / 1000) + 3600
        }, uploadingFile.file, {
            ak: AK,
            sk: SK,
            key: uploadingFile.key,
            onUploadProgress: this.imageUploadProgress
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }

    imageUploadProgress(e){
        this.setState({
            porgress: e.loaded / e.total
        })
    }

    getImageURL(){
        let props = this.props

        let url = ""
        if (/^https?:\/\//.test(props.domain)){
            url = props.domain
        } else {
            url = `http://${props.domain}/`
        }
        
        if (!/\/$/.test(url)){
            url = url + "/"
        }

        return `${url}${props.uploadingFile.key}`
    }


    render(){
        let state = this.state

        let toCopy = type => {
            let listener = e => {
                if (type === "url"){
                    e.clipboardData.setData("text/plain", this.getImageURL())
                } else if (type === "md"){
                    e.clipboardData.setData("text/plain", `![](${this.getImageURL()})`)
                }
                e.preventDefault()
            }

            document.addEventListener("copy", listener)
            document.execCommand("copy")
            document.removeEventListener("copy", listener)
        }

        return (
            <div>
                <ImageContainer>
                    {
                        state.imageData && <img src={state.imageData} />
                    }
                </ImageContainer>
                <Progress progress={state.porgress}>
                    {
                        state.porgress === 1 &&
                            <div>success: {this.getImageURL()}
                                <button onClick={e => toCopy("url")}>复制</button>
                                <button onClick={e => toCopy("md")}>复制MD</button>
                            </div>
                    }
                </Progress>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        AK: state.globalConfig.AK,
        SK: state.globalConfig.SK,
        scope: state.globalConfig.scope,
        domain: state.globalConfig.domain
    }
}

export default connect(mapStateToProps)(UploadingFileItem)