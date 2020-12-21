const envObject = {
    development:{
        baseUrl:'http://localhost:7758/api/home/',
        pathUrl:'http://localhost:7758'
    },
    production:{
        baseUrl:'https://aiva.vip/api/home/',
        pathUrl:'https://aiva.vip'

    }

}
const env = envObject[process.env.NODE_ENV]
module.exports = env