/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-04-09 14:54:52
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
        }else if(new Date().valueOf() - store.state.accessTime > 5000) {
            store.dispatch("addTraffic",to.path)
        }
        
        fn()
    })
}