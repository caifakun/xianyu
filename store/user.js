// store中的state必须要暴露出去，state表单存放数据的对象（state属性名是固定）
export const state = {
    userInfo:{
        // token:'',
        // user:{}
    }
}

// mutations是用于同步修改state的数据
export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    }
}
// actions是用于异步修改state的数据
export const actions = {}