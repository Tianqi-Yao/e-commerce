import { actions } from '../homePageComponent/homePageActions'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

function CartPage(props) {
    const navigate = useNavigate();
    const handleHepoBtn = () => {
        console.log(props.cartData, "props.cartData")
    }

    const handleDelBtn = (item) => {
        props.delFromCart(item)
        props.updateCartDataToUser(props.currentUser)
    }
    const handleBackBtn = () => {
        navigate("/")
    }

    return (
        <div className="CartPage">
            <button type="button" className="btn btn-primary" onClick={handleHepoBtn}>help</button>
            <nav className='nav'>
                <h1>CartPage</h1>
                <button onClick={handleBackBtn}>Back</button>
            </nav>
            <main className='main'>
                {props.cartData.map((item, i) => (
                    <div className="card" key={item.id}>
                        <img src={item.thumbnailUrl} alt="product" className="card-img-top" />
                        <div className="card-body">
                            <div className="card-title">ID: {item.id}</div>
                            <div className="card-text">{item.title.slice(0, 25) + "..."}</div>
                            <button onClick={() => handleDelBtn(item)}>del</button><span>num: {item.num}</span>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );

}


const mapStateToProps = (store) => (
    {
        data: store.homepageReducer.data,
        cartData: store.homepageReducer.cartData,
        currentUser: store.homepageReducer.currentUser
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        delFromCart: (item) => dispatch(actions.delFromCart(item)),
        updateCartDataToUser: (user) => dispatch(actions.updateCartDataToUser(user)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);