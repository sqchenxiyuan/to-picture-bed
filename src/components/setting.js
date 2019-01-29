import React from "react"
import styled from "styled-components"

let InfoContainer = styled.div`
    flex:1;
    line-height:30px;
    text-align: center;
`

let Input = styled.input`
    border: 1px solid white;
`

const STORAGE_KEY = "TO-PICTURE-BED"

class Setting extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            AK: "",
            SK: "",
            scope: ""
        }

        this.inputAK = this.inputAK.bind(this)
        this.inputSK = this.inputSK.bind(this)
        this.inputScope = this.inputScope.bind(this)
    }

    componentDidMount(){
        this.loadFromLocalStorage()
    }

    inputAK(e){
        let value = e.target.value
        this.setState({
            AK: value
        })
        this.saveToLocalStorage()
    }

    inputSK(e){
        let value = e.target.value
        this.setState({
            SK: value
        })
        this.saveToLocalStorage()
    }

    inputScope(e){
        let value = e.target.value
        this.setState({
            scope: value
        })
        this.saveToLocalStorage()
    }

    loadFromLocalStorage(){
        let data = localStorage.getItem("STORAGE_KEY")
        try {
            data = JSON.parse(data)
            this.setState({
                AK: data.AK || "",
                SK: data.SK || "",
                scope: data.scope || ""
            })
        } catch (e){}
    }

    saveToLocalStorage(){
        let state = this.state
        let data = {
            AK: state.AK,
            SK: state.SK,
            scope: state.scope
        }

        localStorage.setItem("STORAGE_KEY", JSON.stringify(data))
    }

    render(){
        let props = this.props
        let state = this.state

        return (
            <>
                <InfoContainer>
                    AK:
                    <Input onChange={this.inputAK} value={state.AK}></Input>
                </InfoContainer>
                <InfoContainer>
                    SK:
                    <Input onChange={this.inputSK} value={state.SK}></Input>
                </InfoContainer>
                <InfoContainer>
                    scope:
                    <Input onChange={this.inputScope} value={state.scope}></Input>
                </InfoContainer>
            </>
        )
    }
}

export default Setting