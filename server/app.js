import Koa from "koa"
import KoaRouter from "koa-router"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../src/components/app"
import { createNewStore } from "../src/reducers/index"
import { Provider } from "react-redux"
import { ServerStyleSheet } from "styled-components"
import ejs from "ejs"
import fs from "fs"
import path from "path"

const template = fs.readFileSync(path.resolve(__dirname, "../dist/index.ejs")).toString()
const app = new Koa()

const router = new KoaRouter()

//只需要构建一次
const IndexBody = (function initPageBody() {
    let store = createNewStore()
    let sheet = new ServerStyleSheet()
    let html = ReactDOMServer.renderToString(sheet.collectStyles(
        <Provider store={store}>
            <App></App>
        </Provider>
    ))
    let styleTags = sheet.getStyleTags()
    let body = ejs.render(
        template, 
        {
            style: styleTags,
            html
        }, 
        {delimiter: "?"})
    return body
}())

router.get("/", ctx => {
    ctx.body = IndexBody
})

router.get("/public/(.*)", (ctx, next) => {
    ctx.path = ctx.path.replace(/^\/public/, "") //去除前缀
    return next()
}, require("koa-static")(path.resolve(__dirname, "../dist"), {
    maxage: 3600 * 24,
    gzip: true
}))

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)