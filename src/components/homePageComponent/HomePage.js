import { connect } from "react-redux";
import { actions } from "./homePageActions";
import "./homePage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../../asset/images/logo192.png'

let count = 0

function HomePage(props) {
    const [search, setSearch] = useState("");
    const [cartNumber, setCartNumber] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        count += 1
        console.log(count, "count");
    });


    useEffect(() => {
        props.getData();
        console.log("props.currentUser", props.currentUser);
        console.log(props.userData, "props.userData");
    }, [])

    useEffect(() => {
        setCartNumber(props.cartData.length)
    }, [props.cartData])

    const handleSearchBtn = () => {
        console.log(search, "search");
        console.log(props, "props");
        const filtedData = props.data.filter((item) => {
            if (item.title.includes(search)) {
                return true
            }
            return false
        }).slice(0, 20)
        console.log(filtedData, "filtedData");
        props.setData(filtedData)
    }

    const handleAddBtn = (item) => {
        const foundItem = loopCartTofindItem(item)
        console.log("foundItem", foundItem, props.currentUser);
        if (foundItem === null) {
            item.num = 1
            props.addToCart(item)  // 为什么2次？
            if (props.currentUser !== null) {
                props.updateCartDataToUser(props.currentUser)
            }
        } else {
            // foundItem.num +=1  //??? 可以这么写吗 , read-only
            // const editedCart = props.cartData.map((item)=>{
            // })
            props.editCartItemNum(foundItem)
        }

    }

    const handleLogoutBtn = () => {
        props.removeCurrentUser()
        props.emptyCart()

    }

    const handleHeloBtn = () => {
        console.log(props.cartData, "props.cartData")
        console.log(props.userData, "props.userData")
        console.log(props.currentUser, "props.props.currentUser")
    }

    // ******************help functions*************************
    const loopCartTofindItem = (item) => {
        let foundItem = null
        props.cartData.forEach(element => {
            if (item.title === element.title) {
                console.log("find item!", element);
                foundItem = element
            }
        });
        return foundItem
    }
    return (
        <div className="HomePage">
            <header className="header">E-COMMERCE {count}</header>
            <nav className="nav">
                <img src={img} alt="logo" className="logo" />
                <div className="search-container">
                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} className="" />
                    <button type="button" className="btn btn-primary" onClick={handleSearchBtn}>Search</button>
                    <button type="button" className="btn btn-primary" onClick={handleHeloBtn}>help</button>
                    <span>{search}</span>
                </div>
                <div className="user-cart-container">
                    <span>user: {props.currentUser === null ? "Guest" : `${props.currentUser.username}`}</span>
                    <Link to="/login">
                        {props.currentUser === null
                            ?
                            <button className="btn btn-success">Login</button>
                            :
                            <button onClick={handleLogoutBtn} className="btn btn-danger">Logout</button>
                        }
                    </Link>
                    <Link to="/cart">
                        <button type="button" class="btn btn-warning">Cart <span class="badge">{cartNumber}</span></button>
                    </Link>
                </div>
            </nav>
            <main className="main">
                {props.showData.map((item) => (
                    <div className="card" key={item.id}>
                        <img src={item.thumbnailUrl} alt="product" className="card-img-top" />
                        <div className="card-body">
                            <div className="card-title">ID: {item.id}</div>
                            <div className="card-text card-text-mine">{item.title.slice(0, 50) + "..."}</div>
                            <button onClick={() => handleAddBtn(item)} className="btn btn-primary">add</button>
                        </div>
                    </div>
                )
                )}
            </main>
            <footer className="footer">@Tianqi Yao</footer>

        </div>
    );

}

const mapStateToProps = (store) => (
    {
        data: store.homepageReducer.data,
        showData: store.homepageReducer.showData,
        cartData: store.homepageReducer.cartData,
        userData: store.homepageReducer.userData,
        currentUser: store.homepageReducer.currentUser
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        getData: () => dispatch(actions.getData()),
        setData: (filtedData) => dispatch(actions.setData(filtedData)),
        addToCart: (item) => dispatch(actions.addToCart(item)),
        editCartItemNum: (item) => dispatch(actions.editCartItemNum(item)),
        updateCartDataToUser: (user) => dispatch(actions.updateCartDataToUser(user)),
        emptyCart: () => dispatch(actions.emptyCart()),
        removeCurrentUser: () => dispatch(actions.removeCurrentUser()),
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);