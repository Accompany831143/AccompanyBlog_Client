/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-01-21 10:34:28
 * @FilePath: \AivaBlog_Client\plugins\route.js
 */
export default ({app,store}) => {
    app.router.beforeEach((to,from,fn) => {
        if(to.name === 'index') {
            store.commit('changeIsHome',true)
        }else {
            store.commit('changeIsHome',false)
        }

        store.dispatch("addTraffic",to.path)
        fn()
    })
}