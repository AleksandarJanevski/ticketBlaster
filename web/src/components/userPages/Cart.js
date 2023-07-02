import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from '../functions/functions'

export const Cart = () => {
    const [cart, setCart] = useState([])
    const id = useSelector(state => state.idReducer.id.id)
    useEffect(() => {
        if (id) {
            getCart()
        }
    }, [id]);
    const getCart = async () => {
        try {
            console.log(id);
            const response = await fetch(`/api/v1/ecommerce/basket/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setCart(result.data.basket);
                console.log(result.data.basket);
            }
        } catch (err) {
            console.log(err);
            return console.log(err);
        }
    };
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
                window.location.href = '/cart'
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="cart">
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
                <button><a href="/">Back</a></button>
                <button><a href="/checkout">Checkout</a></button>
            </div>
        </div>


    )
}