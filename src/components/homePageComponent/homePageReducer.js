import Actions from '../../constants'

const initialState = {
    data: [],
    showData: [],
    cartData: [],
    userData: [],
    currentUser: null

}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.INIT_DATA:
            return {
                ...state,
                data: action.payload
            }
        case Actions.SET_DATA:
            return {
                ...state,
                showData: action.payload
            }
        case Actions.ADD_TO_CART:
            return {
                ...state,
                cartData: [...state.cartData, action.payload]  // ??? render 2 times
            }
        case Actions.ADD_USER:
            return {
                ...state,
                userData: [...state.userData, action.payload]
            }
        case Actions.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case Actions.DEL_FROM_CART:
            return {
                ...state,
                cartData: state.cartData.filter((item)=>item.title!==action.payload.title)
            }
        case Actions.REMOVE_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            }
        case Actions.EMPTY_CART:
            return {
                ...state,
                cartData: []
            }
        case Actions.UPDATE_CART_DATA_TO_USER:
            return {
                ...state,
                userData: state.userData.map((user)=>{
                    if(user.username === action.payload.username){
                        user.cart=state.cartData
                        return user
                    }else{
                        return user
                    }
                })
            }
        case Actions.UPDATE_USER_CART_DATA_TO_CART:
            return {
                ...state,
                cartData: action.payload
            }
        case Actions.EDIT_CART_ITEM_NUM:
            return {
                ...state,
                cartData: state.cartData.map((item)=>{              // ??? 逻辑可以写这里吗？ 还是写到HomePage里调用的方法那？
                    if (item.title === action.payload.title) {
                        item.num += 1
                        return item
                    }else{
                        return item
                    }
                })
            }
        default:
            return { ...state }
    }
}

export default homePageReducer;