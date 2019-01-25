import React from "react"
import styled from "styled-components"


class App extends React.Component{
    render(){
        let Div = styled.div`
            color: red;
            display: flex;
            flex: 1;

            p{
                color: blue;
            }
        `

        return (
            <Div>ashdjghgsafjsgdjf
                <p>asdfasdf</p>
            </Div>
        )
    }
}

export default App