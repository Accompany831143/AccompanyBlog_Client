/*
 * @Date: 2020-12-17 17:51:37
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-04 16:54:24
 * @FilePath: \AivaBlog_Client\plugins\envConst.js
 */
const envObject = {
    development:{
        baseUrl:'http://localhost:7758/api/home/',
        pathUrl:'http://localhost:7758/'
    },
    production:{
        baseUrl:'https://blog-server:7758/api/home/',
        pathUrl:'https://blog-server:7758/'

    },
    test:{
        baseUrl:'http://blog-server:7758/api/home/',
        pathUrl:'http://blog-server:7758/'
    }

}
const env = envObject[process.env.NODE_ENV]
module.exports = env