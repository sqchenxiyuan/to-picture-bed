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

router.get("/", ctx => {
    const store = createNewStore()
    const sheet = new ServerStyleSheet()
    const html = ReactDOMServer.renderToString(sheet.collectStyles(
        <Provider store={store}>
            <App></App>
        </Provider>
    ))
    const styleTags = sheet.getStyleTags()
    const body = ejs.render(
        template, 
        {
            style: styleTags,
            html
        }, 
        {delimiter: "?"})
    ctx.body = body
})

router.get("/public/(.*)", (ctx, next) => {
    ctx.path = ctx.path.replace(/^\/public/, "") //去除前缀
    return next()
}, require("koa-static")(path.resolve(__dirname, "../dist")))

app.use(router.routes()).use(router.allowedMethods())

app.use(require("koa-static")(path.resolve(__dirname, "../dist")))

app.listen(3000)