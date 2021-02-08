/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-02-08 16:53:06
 * @FilePath: \AivaBlog_Client\plugins\route.js
 */
export default ({app,store}) => {
    app.router.beforeEach((to,from,fn) => {
        if(to.name === 'index') {
            store.commit('changeIsHome',true)
        }else {
            store.commit('changeIsHome',false)
        }

        if(store.state.accessTime === undefined) {
            store.dispatch("addTraffic",to.path)
            store.commit('changeAccessTime',new Date().valueOf())
        }
        
        fn()
    })
}