/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2020-12-28 10:28:01
 * @FilePath: \AivaBlog_Client\store\index.js
 */
import Env from "../plugins/envConst";

export const state = () => {
    return {
        isHome: false,
        logined: false,
        userInfo:{}
    }
    

}

export const mutations = {
    changeIsHome(state, flag) {
        state.isHome = flag
    },
    changeLoginStatus(state,flag) {
        state.logined = flag
    },
    changeUserInfo(state,info) {
        state.userInfo = info
    },
}


export const actions = {
    getUserInfo(context,fn) {
        this.$axios({
            url:'/user/getUserInfo',
            method:'post'
        }).then(res => {
            
            res.body.result.userAvatar = Env.pathUrl + res.body.result.userAvatar
            context.commit('changeUserInfo',res.body.result)
            if(fn && res) {
                fn()
            }
        })
    }
}