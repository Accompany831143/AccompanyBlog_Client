/*
 * @Date: 2020-11-25 17:04:26
 * @LastEditors: Aiva
 * @LastEditTime: 2021-03-20 10:59:59
 * @FilePath: \AivaBlog_Client\store\index.js
 */

export const state = () => {
    return {
        isHome: false,
        logined: false,
        userInfo:{},
        isLoading:!true,
        accessTime:undefined
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
    changeLoading(state,flag) {
        // state.isLoading = flag
    },
    changeAccessTime(state,time) {
        state.accessTime = time

    }
}


export const actions = {
    getUserInfo(context,fn) {
        this.$axios({
            url:'/user/getUserInfo',
            method:'post'
        }).then(res => {
            
            res.body.result.userAvatar = res.body.result.userAvatar
            context.commit('changeUserInfo',res.body.result)
            if(fn && res) {
                fn()
            }
        })
    },
    addTraffic(context,path) {
        this.$axios({
            url:'/access/addTraffic',
            method:'post',
            data:{path}
        })
        
    }
}