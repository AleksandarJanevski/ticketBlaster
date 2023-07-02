import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from '../functions/functions'
import { element } from 'prop-types'

export const CheckOut = () => {
    const [cart, setCart] = useState([])
    const id = useSelector(state => state.idReducer.id.id)
    let [total, setTotal] = useState(0)
    const currentDate = new Date().toISOString().split("T")[0].slice(0, 7);
    const year = currentDate[3];
    const maxDate = currentDate.replace(year, (parseInt(year) + 5));
    const [toggle, setToggle] = useState(false)
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
                setTotal(result.data.basket.reduce((accumulator, element) => {
                    return accumulator + (element.amount * element.event.price);
                }, 0))
            }
        } catch (err) {
            console.log(err);
            return console.log(err);
        }
    };
    const removeFromCart = async () => {
        try {
            console.log(id); //ADD DELETE MANY FUNCTION
            const response = await fetch(`/api/v1/ecommerce/basket/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setCart(result.data.basket);
                setTotal(result.data.basket.reduce((accumulator, element) => {
                    return accumulator + (element.amount * element.event.price);
                }, 0))
            }
        } catch (err) {
            console.log(err);
            return console.log(err);
        }
    };
    return (
        <div id="checkout">
            <div id="checkout_left">
                <h1>Checkout</h1>
                {cart && cart.map((element, i) => {
                    const price = parseInt(element.amount) * parseInt(element.event.price);
                    let date = formatDate(new Date(element.event.date).toLocaleDateString('en-GB'))
                    return (
                        <span>
                            <div id="checkout_card">
                                <div id="checkout_card_left">
                                    <img src={`http://localhost:9000/img/event/${element.event.picture}`} alt="" />
                                    <aside>
                                        <p>{element.event.name}</p>
                                        <p>{date}</p>
                                        <p>{element.event.location}</p>
                                    </aside>
                                </div>
                                <div id="checkout_card_right">
                                    <p>${price}.00 USD</p>
                                    <p>{element.amount} x ${element.event.price}.00 USD</p>
                                </div>
                            </div>
                        </span>);
                })}
                <div id="checkout_total">
                    <p>Total:</p>
                    <p>${total}.00 USD</p>
                </div>
            </div>
            <div id="checkout_right">
                <span>
                    <label htmlFor="">Full Name</label>
                    <input type="text" required />
                </span>
                <span>
                    <label htmlFor="">Card No.</label>
                    <input type="number" required />
                </span>
                <span>
                    <label htmlFor="">Expires</label>
                    <input type="month" min={currentDate} max={maxDate} required />
                </span>
                <span>
                    <label htmlFor="">PIN</label>
                    <input type="password" maxLength={4} required />
                </span>
            </div>
            <div id="checkout_bottom">
                <button><a href="/cart">Back</a></button>
                <button>Pay Now</button>
            </div>
        </div>
    )
}