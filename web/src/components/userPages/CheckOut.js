import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate, verifyData } from '../functions/functions';
import { PrintEvent } from "./PrintEvent";
import { Link } from 'react-router-dom'
import { getBasket } from "../../redux/actions/userActions";

export const CheckOut = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.userReducer.basket)
    const [total, setTotal] = useState(0);
    const [gratitude, setGratitude] = useState(false)
    const currentDate = new Date().toISOString().split("T")[0].slice(0, 7);
    const year = currentDate[3];
    const maxDate = currentDate.replace(year, (parseInt(year) + 5));
    const [toggle, setToggle] = useState(false);
    const [toggleB, setToggleB] = useState(false);
    const [transaction, setTransaction] = useState(false);
    const [purchase, setPurchase] = useState([])
    const [payment, setPayment] = useState({
        fullName: '',
        cardNo: 0,
        expire: {
            month: 10,
            year: 2023,
        },
        pin: 0
    });
    const [print, setPrint] = useState({
        name: '',
        date: '',
        location: '',
        image: ''
    });
    useEffect(() => {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                setToggleB(false)
            }
        }, true)
    }, [])
    useEffect(() => {
        setTotal(
            cart.reduce((accumulator, element) => {
                return accumulator + element.amount * element.event.price;
            }, 0))
    }, [cart])
    useEffect(() => {
        if (toggle) {
            removeMany();
        }
    }, [toggle]);
    useEffect(() => {
        if (gratitude) {
            dispatch(getBasket([]))
        }
    }, [gratitude])
    useEffect(() => {
        if (transaction) {
            orderMany();
        }
    }, [transaction]);

    const cardVerify = async () => {
        try {
            if (payment.cardNo < 1000000000000000 || payment.cardNo > 9007199254740991) {
                return alert('Please add a valid credit card number');
            }
            verifyData(payment, true);
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
                setPurchase([...cart]);
                setGratitude(true)
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
                event: element.event._id,
                eventDate: element.event.date
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
            {!gratitude ? <>
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
                            onChange={e => {
                                setPayment({ ...payment, pin: parseInt(e.target.value) });
                            }}
                            required
                        />
                    </span>
                </div>
                <div id="checkout_bottom">
                    <button>
                        <Link to='/cart'>Back</Link>
                    </button>
                    <button onClick={cardVerify}>Pay Now</button>
                </div>
            </> : <div id='gratitude'>
                <h1>Thank you for your purchase</h1>
                <span>
                    {purchase.map((element, i) => {
                        const price = parseInt(element.amount) * parseInt(element.event.price);
                        let date = formatDate(
                            new Date(element.event.date).toLocaleDateString('en-GB')
                        );
                        return (
                            <span key={i}>
                                <div id="gratitude_card">
                                    <div id="gratitude_left">
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
                                    <div id="gratitude_right">
                                        <span>
                                            <p>${price}.00 USD</p>
                                            <p>
                                                {element.amount} x ${element.event.price}.00 USD
                                            </p>
                                        </span>
                                        <button type="button" onClick={() => {
                                            const obj = {
                                                name: element.event.name,
                                                location: element.event.location,
                                                date: date,
                                                image: `/img/event/${element.event.picture}`
                                            }
                                            setPrint(obj);
                                            setToggleB(true)
                                        }}>Print</button>
                                    </div>
                                </div>
                            </span>
                        );
                    })}
                </span>
            </div>}
            {toggleB ? <PrintEvent name={print.name} image={print.image} location={print.location} date={print.date} /> : null}
        </div>
    );
};
