import React from "react"
import { CSSTransition } from "react-transition-group"
import IS_SERVER from "../../../utils/is-server"

let styles = {}
if (!IS_SERVER){
    styles = require("./index.css")
}

const CLASSNAMES = {
    enter: styles["transition-fade-enter"],
    enterActive: styles["transition-fade-enter-active"],
    enterDone: styles["transition-fade-enter-done"],
    exit: styles["transition-fade-exit"],
    exitActive: styles["transition-fade-exit-active"],
    exitDone: styles["transition-fade-exit-done"],
}

function FadeTransition(props){
    return (
        <CSSTransition {...props} classNames={CLASSNAMES}></CSSTransition>
    )
}

export default FadeTransition