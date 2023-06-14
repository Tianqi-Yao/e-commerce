import { useState } from "react";
import { actions } from '../homePageComponent/homePageActions'
import { connect } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import img from '../../asset/images/logo192.png'

function LoginPage(props) {
    const [inLogin, setInLogin] = useState(true)
    const navigate = useNavigate();

    const handleSwitchBtn = () => {
        setInLogin(prev => !prev)
    }

    const handelSignIn = (e) => {
        e.preventDefault()
        const user = getUserInfo(e)
        if (!isEmptyCheck(user)) {
            return
        }
        const foundUser = checkUserAndPassword(user)
        if (foundUser !== null) {
            props.setCurrentUser(foundUser)
            // props.updateCartDataToUser(foundUser)
            props.updateUserCartDataToCart(foundUser.cart)
            navigate('/')
        }
    }
    const handelSignUp = (e) => {
        e.preventDefault()
        const user = getUserInfo(e)
        if (!isEmptyCheck(user)) {
            return
        }
        if (loopUsersTofindUser(user) !== null) {
            alert("already have same username!")
            return
        }
        if (user.rePassowrd === user.password) {
            props.addUser(user)
            props.setCurrentUser(user)
            props.updateCartDataToUser(user)
            console.log(props.userData, "success add new user!");
            navigate('/')
        }
    }

    // ******************help functions*************************
    const getUserInfo = (e) => {
        const user = {
            username: "",
            password: "",
            rePassowrd: ""
        }
        const elementsList = Array.from(e.target)
        elementsList.forEach(element => {
            if (element.className === "username") {
                user.username = element.value
            } else if (element.className === "password") {
                user.password = element.value
            } else if (element.className === "re-password") {
                user.rePassowrd = element.value
            }
        });
        return user;
    }

    const loopUsersTofindUser = (user) => {
        let foundUser = null
        props.userData.forEach(element => {
            if (user.username === element.username) {
                console.log("find user!", element);
                foundUser = element
            }
        });
        return foundUser
    }
    const checkUserAndPassword = (user) => {
        const foundUser = loopUsersTofindUser(user)
        if (foundUser === null) {
            alert("username error!")
            return null
        }
        if (foundUser && foundUser.password === user.password) {
            console.log("find user! and password is correct!");
            return foundUser;
        } else {
            alert("password error")
            return null
        }
    }

    const isEmptyCheck = (user) => {
        if (user.username && user.password) {
            console.log("yes");
            return true
        }
        else {
            console.log("no");
            alert("no empty input!!!")
            return false
        }
    }

    return (
        <div className="Login">
            {inLogin
                ?
                <>
                    <Link to="/"><img src={img} alt="logo" className="logo" /> </Link>
                    <h1>Login</h1>
                    <form onSubmit={e => handelSignIn(e)}>
                        <span>UserName: </span><input type="text" className="username" />
                        <span>Password: </span><input type="password" className="password" />
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleSwitchBtn}>Create new account</button>
                    </form>
                </>
                :
                // ??? btn type problem ??? 共用input？
                <>
                    <Link to="/"><img src={img} alt="logo" className="logo" /></Link>
                    <h1>Register</h1>
                    <form onSubmit={e => handelSignUp(e)}>
                        <span>UserName: </span><input type="text" className="username" />
                        <span>Password: </span><input type="password" className="password" />
                        <span>Re-Password: </span><input type="password" className="re-password" />
                        <button type="submit">Sign Up</button>
                        <button type="button" onClick={handleSwitchBtn}>Back</button>
                    </form>
                </>}
        </div>
    );

}


const mapStateToProps = (store) => (
    {
        data: store.homepageReducer.data,
        cartData: store.homepageReducer.cartData,
        userData: store.homepageReducer.userData,

    }
)

const mapDispatchToProps = (dispatch) => (
    {
        addUser: (user) => dispatch(actions.addUser(user)),
        setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
        updateCartDataToUser: (user) => dispatch(actions.updateCartDataToUser(user)),
        emptyCart: () => dispatch(actions.emptyCart()),
        updateUserCartDataToCart: (cart) => dispatch(actions.updateUserCartDataToCart(cart)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);