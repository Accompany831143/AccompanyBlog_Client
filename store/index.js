export const state = () => {
    return {
        isHome: false
    }
    

}

export const mutations = {
    changeIsHome(state, flag) {
        state.isHome = flag
    }
}