export const state = ()=>{
    return {
        history:[],
        // 用于存储获取回来的机票信息
        flightsData:{
            seat_infos:{} //添加默认值，以免没请求回来进行渲染 出现报错
        },
        totalPrice:0 // 计算总价

    }
}

export const mutations = {
    setHistory(state,data){
         // 把最新的搜索记录添加到第一位
       return state.history.unshift(data); 
    },
    // 修改设置机票信息
    setFlightsData(state,data){
        return state.flightsData = data;
    },
    setTotalPrice(state,price){
        return state.totalPrice = price;
    }

}