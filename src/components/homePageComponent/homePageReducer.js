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
        default:
            return { ...state }
    }
}

export default homePageReducer;