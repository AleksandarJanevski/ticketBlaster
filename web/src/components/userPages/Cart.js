import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate } from '../functions/functions'
import { Link } from 'react-router-dom'
import { getBasket } from "../../redux/actions/userActions";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.userReducer.basket)
    const { id } = useSelector(state => state.idReducer.id);

    const cartRemove = async (event) => {
        try {
            const response = await fetch(`/api/v1/ecommerce/basket/${event}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.status === 204) {
                const filter = cart.filter(element => element._id !== event)
                dispatch(getBasket(filter))
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="cart">
            {id && id ? <>
                <h1>Shopping Cart</h1>
                {cart && cart.map((element, i) => {
                    const price = parseInt(element.amount) * parseInt(element.event.price);
                    let date = formatDate(new Date(element.event.date).toLocaleDateString('en-GB'))
                    return (
                        <span id="cart_events" key={i}>
                            <div id="cart_left">
                                <img src={`http://localhost:9000/img/event/${element.event.picture}`} alt="" />
                                <div id="cart_left_info">
                                    <p>{element.event.name}</p>
                                    <p>{date}</p>
                                    <p>{element.event.location}</p>
                                </div>
                            </div>
                            <div id="cart_right">
                                <p>${price}.00 USD</p>
                                <p>{element.amount} x ${element.event.price}.00 USD</p>
                                <button type='button' onClick={() => { cartRemove(element._id) }}>Remove</button>
                            </div>
                        </span>
                    );
                })}
                <div id="cart_bottom">
                    <button><Link to='/'>Back</Link></button>
                    {cart.length > 0 ? <button ><Link to={'/checkout'}>Checkout</Link></button> : <button style={{ opacity: "0.3" }}>Checkout</button>}
                </div>
            </> : null}

        </div>


    )
}