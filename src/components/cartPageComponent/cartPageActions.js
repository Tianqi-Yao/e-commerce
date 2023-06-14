// import axios from 'axios';
// import Actions from '../../constants'

// const initData = (payload) => ({
//     type: Actions.INIT_DATA,
//     payload
// })

// const setData = (payload) => ({
//     type: Actions.SET_DATA,
//     payload
// })

// const getData = () => {
//     return (dispatch) => {
//         axios.get('https://jsonplaceholder.typicode.com/photos')
//             .then((res) => {
//                 // console.log(res.data);
//                 dispatch(initData(res.data))
//                 const showData = res.data.slice(0, 20)
//                 dispatch(setData(showData))
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
// }


// export const actions = {
//     setData,
//     getData
// };
