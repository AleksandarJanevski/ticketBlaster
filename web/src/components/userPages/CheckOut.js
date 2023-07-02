import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate, verifyData } from '../functions/functions';

export const CheckOut = () => {
    const [cart, setCart] = useState([]);
    const id = useSelector(state => state.idReducer.id.id);
    const [total, setTotal] = useState(0);
    const currentDate = new Date().toISOString().split("T")[0].slice(0, 7);
    const year = currentDate[3];
    const maxDate = currentDate.replace(year, (parseInt(year) + 5));
    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState(false);
    const [payment, setPayment] = useState({
        fullName: '',
        cardNo: 0,
        expire: {
            month: 0,
            year: 0,
        },
        pin: 0
    });
    useEffect(() => {
        if (id) {
            getCart();
        }
    }, [id]);

    useEffect(() => {
        if (toggle) {
            removeMany();
        }
    }, [toggle]);

    useEffect(() => {
        if (transaction) {
            orderMany();
        }
    }, [transaction]);

    const cardVerify = async () => {
        try {
            verifyData(payment);
            const response = await fetch('/api/v1/ecommerce/payment', {
                method: 'POST',
                body: JSON.stringify(payment),
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.status === 200) {
                setTransaction(!transaction);
                console.log('success');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCart = async () => {
        try {
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
                setTotal(
                    result.data.basket.reduce((accumulator, element) => {
                        return accumulator + element.amount * element.event.price;
                    }, 0)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeMany = async () => {
        try {
            let arr = cart.map(element => ({
                _id: element._id
            }));
            const response = await fetch('/api/v1/ecommerce/deleteMany', {
                method: 'DELETE',
                body: JSON.stringify(arr),
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.status === 204) {
                window.location.href = '/cart'
            }
        } catch (err) {
            console.log(err);
        }
    };

    const orderMany = async () => {
        try {
            let arr = cart.map(element => ({
                amount: element.amount,
                beholder: element.beholder,
                event: element.event._id
            }));
            const response = await fetch('/api/v1/ecommerce/orderMany', {
                method: 'POST',
                body: JSON.stringify(arr),
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setToggle(!toggle);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="checkout">
            <div id="checkout_left">
                <h1>Checkout</h1>
                {cart &&
                    cart.map((element, i) => {
                        const price = parseInt(element.amount) * parseInt(element.event.price);
                        let date = formatDate(
                            new Date(element.event.date).toLocaleDateString('en-GB')
                        );
                        return (
                            <span key={i}>
                                <div id="checkout_card">
                                    <div id="checkout_card_left">
                                        <img
                                            src={`http://localhost:9000/img/event/${element.event.picture}`}
                                            alt=""
                                        />
                                        <aside>
                                            <p>{element.event.name}</p>
                                            <p>{date}</p>
                                            <p>{element.event.location}</p>
                                        </aside>
                                    </div>
                                    <div id="checkout_card_right">
                                        <p>${price}.00 USD</p>
                                        <p>
                                            {element.amount} x ${element.event.price}.00 USD
                                        </p>
                                    </div>
                                </div>
                            </span>
                        );
                    })}
                <div id="checkout_total">
                    <p>Total:</p>
                    <p>${total}.00 USD</p>
                </div>
            </div>
            <div id="checkout_right">
                <span>
                    <label htmlFor="">Full Name</label>
                    <input
                        type="text"
                        value={payment.fullName}
                        onChange={e => {
                            setPayment({ ...payment, fullName: e.target.value });
                        }}
                        required
                    />
                </span>
                <span>
                    <label htmlFor="cardNo">Card No.</label>
                    <input
                        type="number"
                        id="cardNo"
                        value={payment.cardNo}
                        onChange={e => {
                            setPayment({ ...payment, cardNo: e.target.value });
                        }}
                        required
                    />
                </span>
                <span>
                    <label htmlFor="expire">Expires</label>
                    <input
                        type="month"
                        id="expire"
                        min={currentDate}
                        max={maxDate}
                        value={`${payment.expire.year}-${payment.expire.month}`}
                        onChange={e => {
                            const [year, month] = e.target.value.split('-');
                            setPayment({
                                ...payment,
                                expire: {
                                    year: parseInt(year),
                                    month: parseInt(month)
                                }
                            });
                        }}
                        required
                    />
                </span>
                <span>
                    <label htmlFor="pin">PIN</label>
                    <input
                        type="password"
                        id="pin"
                        maxLength={4}
                        value={payment.pin}
                        onChange={e => {
                            setPayment({ ...payment, pin: parseInt(e.target.value) });
                        }}
                        required
                    />
                </span>
            </div>
            <div id="checkout_bottom">
                <button>
                    <a href="/cart">Back</a>
                </button>
                <button onClick={cardVerify}>Pay Now</button>
            </div>
        </div>
    );
};
