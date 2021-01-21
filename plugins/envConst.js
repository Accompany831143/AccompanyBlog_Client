/*
 * @Date: 2020-12-17 17:51:37
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-21 12:38:12
 * @FilePath: \AivaBlog_Client\plugins\envConst.js
 */
const envObject = {
    development:{
        baseUrl:'http://localhost:7758/api/home/',
        pathUrl:'http://localhost:7758/'
    },
    production:{
        baseUrl:'https://aiva.vip/api/home/',
        pathUrl:'https://aiva.vip/'
    },
    test:{
        baseUrl:'http://192.168.16.130/api/home/',
        pathUrl:'http://192.168.16.130/'
    }

}
const env = envObject[process.env.NODE_ENV]
module.exports = env
