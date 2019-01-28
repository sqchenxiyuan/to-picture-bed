import React from "react"
import styled from "styled-components"
import { Transition } from "react-transition-group"

import Setting from "./setting"

let HeaderContainer = styled.div`
    z-index: 10;
    position: relative;
    width: 100%;
    height: 70px;
    background: black;
`

let SettingButton = styled.div`
    cursor: pointer;
    width: 70px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    border: 1px solid white;
    border-radius: 3px;
    color: white;
    text-align: center;
    line-height: 30px;
`

let SettingContainer = styled.div`
    z-index: 5;
    position: relative;
    width: 100%;
    background: gray;
    transform: ${props => {
        switch (props.transitionStatus){
            case "entering": return "translate(0, 0px)"
            case "entered": return "translate(0, 0px)"
            case "exiting": return "translate(0, -70px)"
            case "exited": return "translate(0, -70px)"
        }
    }};
    height: 70px;
    transition: transform 0.3s;
    overflow: hidden;
`

class Header extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            setting: false, //是否展示设置
        }

        this.flipSettingStatus = this.flipSettingStatus.bind(this)
    }

    flipSettingStatus(){
        this.setState(state => ({
            setting: !state.setting
        }))
    }

    render(){
        let props = this.props
        let state = this.state

        return (
            <>
                <HeaderContainer>
                    <SettingButton onClick={this.flipSettingStatus}>设置</SettingButton>
                </HeaderContainer>
                <Transition in={state.setting} timeout={300}>
                    {
                        state => 
                            <SettingContainer transitionStatus={state}>
                                <Setting></Setting>
                            </SettingContainer>
                    }
                </Transition>
            </>
        )
    }
}

export default Header