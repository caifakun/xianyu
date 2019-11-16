export const state = ()=>{
    return {
        history:[],
        // 用于存储获取回来的机票信息
        infoData:{
            seat_infos:{} //添加默认值，以免没请求回来进行渲染 出现报错
        }

    }
}

export const mutations = {
    setHistory(state,data){
         // 把最新的搜索记录添加到第一位
       return state.history.unshift(data); 
    },
    // 修改设置机票信息
    setInfoData(state,data){
        return state.infoData = data;
    }

}