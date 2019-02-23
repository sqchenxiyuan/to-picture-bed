import React from "react"
import styles from "./index.css"
import { CSSTransition } from "react-transition-group"

const CLASSNAMES = {
    enter: styles["transition-fade-enter"],
    enterActive: styles["transition-fade-enter-active"],
    enterDone: styles["transition-fade-enter-done"],
    exit: styles["transition-fade-exit"],
    exitActive: styles["transition-fade-exit-active"],
    exitDone: styles["transition-fade-exit-done"],
}

function FadeTransition(props){
    props.classNames = props.classNames || CLASSNAMES

    return (
        <CSSTransition {...props}></CSSTransition>
    )
}

export default FadeTransition