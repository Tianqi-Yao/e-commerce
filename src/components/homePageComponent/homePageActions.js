import axios from 'axios';
import Actions from '../../constants'

const initData = (payload) => ({
    type: Actions.INIT_DATA,
    payload
})

const setData = (payload) => ({
    type: Actions.SET_DATA,
    payload
})

const addToCart = (payload) => ({
    type: Actions.ADD_TO_CART,
    payload
})

const delFromCart = (payload) => ({
    type: Actions.DEL_FROM_CART,
    payload
})

const addUser = (payload) => ({
    type: Actions.ADD_USER,
    payload
})

const setCurrentUser = (payload) => ({
    type: Actions.SET_CURRENT_USER,
    payload
})
const editCartItemNum = (payload) => ({
    type: Actions.EDIT_CART_ITEM_NUM,
    payload
})
const removeCurrentUser = (payload) => ({
    type: Actions.REMOVE_CURRENT_USER,
    payload
})
const emptyCart = (payload) => ({
    type: Actions.EMPTY_CART,
    payload
})
const updateCartDataToUser = (payload) => ({
    type: Actions.UPDATE_CART_DATA_TO_USER,
    payload
})
const updateUserCartDataToCart = (payload) => ({
    type: Actions.UPDATE_USER_CART_DATA_TO_CART,
    payload
})

const getData = () => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then((res) => {
                // console.log(res.data);
                dispatch(initData(res.data))
                const showData = res.data.slice(0, 20)
                dispatch(setData(showData))
            })
            .catch((err) => {
                console.log(err);
            })
    }
}


export const actions = {
    setData,
    getData,
    addToCart,
    addUser,
    setCurrentUser,
    delFromCart,
    editCartItemNum,
    removeCurrentUser,
    emptyCart,
    updateCartDataToUser,
    updateUserCartDataToCart
};
