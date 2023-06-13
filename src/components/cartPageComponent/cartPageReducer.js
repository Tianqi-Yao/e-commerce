import Actions from '../../constants'

const initialState = {
    data: [],
    showData: []
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
        default:
            return { ...state }
    }
}

export default homePageReducer;