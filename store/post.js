// store中的state必须要暴露出去，state表单存放数据的对象（state属性名是固定）
export const state = ()=>{
    return {
        draftDataList:[] //用于把数据存储到本地
    }
}

// mutations是用于同步修改state的数据
export const mutations = {
    // 设置草稿数据
    setDraftDataList(state,data){
        // 把数据存储到draftDataList
        return state.draftDataList.unshift(data);
    },
    // 修改草稿数据
    changeDraftDataList(state,index){
        const data =  state.draftDataList.splice(index,1);
        return data;
    }
}