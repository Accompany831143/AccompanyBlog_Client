export const state = () => {
    return {
        isHome: false,
        logined:false,
        avatarUrl:''
    }
    

}

export const mutations = {
    changeIsHome(state, flag) {
        state.isHome = flag
    },
    changeLoginStatus(state,flag) {
        state.logined = flag
    },
    changeAvatarUrl(state,url) {
        state.avatarUrl = url
    },
}