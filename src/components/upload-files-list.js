import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import UploadingFileItem from "./uploading-file-item"

const UploadFilesList = (prop) => {
    return (
        <>
            {
                prop.uploadingFiles.map(uploadingFile => {
                    return <UploadingFileItem key={uploadingFile.key} uploadingFile={uploadingFile}></UploadingFileItem>
                })
            }
            <div>123</div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        uploadingFiles: state.uploadFilesData.uploadingFiles
    }
}

export default connect(mapStateToProps)(UploadFilesList)