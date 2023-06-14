import { connect } from "react-redux";
import { actions } from "./homePageActions";
import "./homePage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

let count = 0

function HomePage(props) {
    const [search, setSearch] = useState("");
    const [cartNumber, setCartNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        count +=1
        console.log(count,"count");
    });


    useEffect(() => {
        props.getData();
        console.log(props.currentUser,"props.currentUser");
        console.log(props.userData,"props.userData");
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
        props.addToCart(item)  // 为什么2次？
    }
    const handleHeloBtn = () => {
        console.log(props.cartData,"props.cartData")
    }

    return (
        <div className="HomePage">
            <header className="header">E-COMMERCE {count}</header>
            <nav className="nav">
                <img src="" alt="logo" className="logo" />
                <div className="search-container">
                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                    <button type="button" className="btn btn-primary" onClick={handleSearchBtn}>Search</button>
                    <button type="button" className="btn btn-primary" onClick={handleHeloBtn}>help</button>
                    <span>{search}</span>
                </div>
                <div className="user-cart-container">
                    <Link to="/login"><button>user</button></Link>
                    <Link to="/cart"><button>cart</button></Link>
                    <span>{cartNumber}</span>
                </div>
            </nav>
            <main className="main">
                {props.showData.map((item) => (
                    <div className="card" key={item.id}>
                        <img src={item.thumbnailUrl} alt="product" className="product-img" />
                        <div className="product-info">
                            <div className="product-id">{item.id}</div>
                            <div className="product-title">{item.title}</div>
                            <button onClick={() => handleAddBtn(item)}>add</button>
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
        currentUser:store.homepageReducer.currentUser
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        getData: () => dispatch(actions.getData()),
        setData: (filtedData) => dispatch(actions.setData(filtedData)),
        addToCart: (item) => dispatch(actions.addToCart(item))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);