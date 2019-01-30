//选取文件函数
const filesFilter = function(files, accept = "", size){
    files = Array.from(files)
    let accepts = accept.split(",").map(type => type.trim()).filter(type => type)

    let acceptTests = accepts.map(type => {
        if (/^\./.test(type)){ //为后缀
            return {
                target: "name", //检查名称
                regExp: new RegExp(`${type.replace(".", "\\.")}$`, "i")
            }
        } else { //为MIME类型
            if (/\/\*$/){ //泛匹配
                return {
                    target: "type", //检查名称
                    regExp: new RegExp(`^${type.replace("*", "\\S+")}$`, "i")
                }
            } else {
                return {
                    target: "type", //检查名称
                    regExp: new RegExp(`^${type}$`, "i")
                }
            }
        }
    })

    files = files.filter(file => {
        if (size && file.size > size){
            return false
        }

        let result = true
        if (acceptTests.length > 0) {
            result = acceptTests.some(test => {
                return test.regExp.test(file[test.target])
            })
        }

        if (result){
            return true
        } else {
            return false
        }
    })

    return files
}

const selectFiles = (function(){
    let input = document.createElement("input")
    input.type = "file"
    input.style.opacity = "0"
    input.multiple = true

    return function(accept = "", size){
        //后缀格式为 .xxx类型
        //MIME为  xxxx/yy 或者 xxxx/*
        //逗号分隔
        let accepts = accept.split(",").map(type => type.trim()).filter(type => type)
        input.accept = accepts.join(",")

        let acceptTests = accepts.map(type => {
            if (/^\./.test(type)){ //为后缀
                return {
                    target: "name", //检查名称
                    regExp: new RegExp(`${type.replace(".", "\\.")}$`, "i")
                }
            } else { //为MIME类型
                if (/\/\*$/){ //泛匹配
                    return {
                        target: "type", //检查名称
                        regExp: new RegExp(`^${type.replace("*", "\\S+")}$`, "i")
                    }
                } else {
                    return {
                        target: "type", //检查名称
                        regExp: new RegExp(`^${type}$`, "i")
                    }
                }
            }
        })

        return new Promise((resolve, reject) => {
            input.onchange = e => {
                let files = Array.from(input.files)
                if (files.length === 0) return resolve([])

                let err = ""

                files = files.filter(file => {
                    if (size && file.size > size){
                        err = "ERROR_FILE_SIZE"
                        return false
                    }
    
                    let result = true
                    if (acceptTests.length > 0) {
                        result = acceptTests.some(test => {
                            return test.regExp.test(file[test.target])
                        })
                    }
    
                    if (result){
                        return true
                    } else {
                        err = "ERROR_FILE_TYPE"
                        return false
                    }
                })

                if (files.length > 0){
                    resolve(files)
                } else {
                    if (err){
                        reject(new Error(err))
                    } else {
                        reject(new Error("ERROR_SELECT_NULL_FILES"))
                    }
                }
            }
            
            //兼容IE Input不在DOM树上无法触发选择的问题
            document.body.appendChild(input)
            input.click()
            document.body.removeChild(input)
        })
    }
})()
export { selectFiles, filesFilter }