import { connect } from "react-redux";
import { actions } from "./homePageActions";
import "./homePage.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function HomePage(props) {
    const [search, setSearch] = useState("");
    const [cartNumber,setCartNumber]=useState("");

    useEffect(() => {
        props.getData();
    }, [props])

    const handleSearchBtn=()=>{
        console.log(search);
        console.log(props);
    }

    const handleAddBtn=()=>{
        setCartNumber(prev=>String(Number(prev)+1));
    }

    return (
        <div className="HomePage">
            <header className="header">E-COMMERCE</header>
            <nav className="nav">
                <img src="" alt="logo" className="logo" />
                <div className="search-container">
                    <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
                    <button type="button" className="btn btn-primary" onClick={handleSearchBtn}>Search</button>
                    <span>{search}</span>
                </div>
                <div className="user-cart-container">
                    <Link to="/cart">cart</Link>
                    <button>user</button>
                    <button>cart</button>
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
                            <button onClick={handleAddBtn}>add</button>
                        </div>
                    </div>
                )
                )}
            </main>
            <footer className="footer">@Tianqi Yao</footer>

        </div>
    );

}

const mapStateToProps = (state) => (
    {
        data: state.homepageReducer.data,
        showData: state.homepageReducer.showData
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        getData: () => dispatch(actions.getData()),
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);