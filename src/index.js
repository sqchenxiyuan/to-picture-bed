import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import App from "./components/app"

import { createNewStore } from "./reducers"
const store = createNewStore()

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)