import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate, verifyData } from "../../utils/reusableFunctions";
import { PrintEvent } from "../utils/PrintEvent";
import { Link, useNavigate } from "react-router-dom";
import { getBasket, getTickets } from "../../../redux/actions/userActions";
import { printAction } from "../../../redux/actions/printAction";

export const CheckOut = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userReducer.basket);
  const tickets = useSelector((state) => state.userReducer.tickets);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [gratitude, setGratitude] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [payment, setPayment] = useState({
    fullName: "",
    cardNo: 0,
    expire: {
      month: 10,
      year: 2023,
    },
    pin: 0,
  });
  const [print, setPrint] = useState({
    name: "",
    date: "",
    location: "",
    image: "",
    purchaseNo: "",
  });

  const currentDate = new Date().toISOString().slice(0, 7);
  let [year, month] = currentDate.split("-");
  month = Number(month) + 1;
  if (month > 12) {
    month = Number(month) - 12;
    year = Number(year) + 1;
  }
  if (Number(month) < 10) {
    month = `0${month}`;
  }
  const minDate = `${year}-${month}`;
  const maxDate = `${Number(year) + 5}-${month}`;

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape") {
          setToggleB(false);
        }
      },
      true
    );
  }, []);
  useEffect(() => {
    setTotal(
      cart.reduce((accumulator, element) => {
        return accumulator + element.amount * element.event.price;
      }, 0)
    );
  }, [cart]);
  useEffect(() => {
    if (toggle) {
      removeMany();
    }
  }, [toggle]);
  useEffect(() => {
    if (gratitude) {
      dispatch(getBasket([]));
    }
  }, [gratitude]);
  useEffect(() => {
    if (transaction) {
      orderMany();
    }
  }, [transaction]);

  const cardVerify = async () => {
    try {
      if (
        payment.cardNo < 1000000000000000 ||
        payment.cardNo > 9007199254740991
      ) {
        return alert(
          "Please add a valid credit card number, you entered " +
            payment.cardNo.toString().length +
            " digits. 16 required!"
        );
      }
      verifyData(payment, true);
      const response = await fetch("/api/v1/ecommerce/payment", {
        method: "POST",
        body: JSON.stringify(payment),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        setTransaction(!transaction);
      }
    } catch (err) {
      return alert("Invalid Credit Card Info");
    }
  };

  const removeMany = async () => {
    try {
      const events = cart.map((element) => element.event._id);
      const response = await fetch("/api/v1/ecommerce/basket/removeMany", {
        method: "DELETE",
        body: JSON.stringify({
          events: events,
        }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        setGratitude(true);
        let arr2 = [...tickets].concat(purchase);
        arr2.sort((a, b) => {
          return new Date(b.eventDate) - new Date(a.eventDate);
        });
        dispatch(getTickets(arr2));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const orderMany = async () => {
    try {
      let arr = cart.map((element) => ({
        amount: element.amount,
        beholder: element.beholder,
        event: element.event._id,
        eventDate: element.event.date,
      }));
      console.log(arr);
      const response = await fetch("/api/v1/ecommerce/order", {
        method: "POST",
        body: JSON.stringify(arr),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        setPurchase(result.tickets);
        setToggle(!toggle);
      }
    } catch (err) {
      setTransaction(false);
      return console.log(err);
    }
  };

  return (
    <div id="checkout_top">
      {!gratitude ? (
        <div id="checkout">
          <h1>Checkout</h1>
          <div id="checkout_mid">
            <div id="checkout_left">
              <div id="checkout_list">
                {cart &&
                  cart.map((element, i) => {
                    const price =
                      parseInt(element.amount) * parseInt(element.event.price);
                    let date = formatDate(
                      new Date(element.event.date).toLocaleDateString("en-GB")
                    );
                    const lastElem = i === cart.length - 1;
                    return (
                      <div id="checkout_div" key={i}>
                        <div id="checkout_card">
                          <div id="checkout_card_left">
                            <div
                              id="checkout_pic"
                              style={{
                                backgroundImage: `url(/img/event/${element.event.picture})`,
                              }}
                            ></div>
                            <aside>
                              <p>{element.event.name}</p>
                              <p>{date}</p>
                              <p>{element.event.location}</p>
                            </aside>
                          </div>
                          <aside id="checkout_price">
                            <p>${price}.00 USD</p>
                            <p>
                              {element.amount} x ${element.event.price}.00 USD
                            </p>
                          </aside>
                        </div>
                        <div
                          style={{
                            marginBottom: lastElem ? "0" : "24.5px",
                            marginTop: "24.5px",
                          }}
                          id="border"
                        ></div>
                      </div>
                    );
                  })}
              </div>
              <div id="checkout_total">
                <p>Total:</p>
                <p>${total}.00 USD</p>
              </div>
            </div>
            <div id="checkout_right">
              <span>
                <label className="inputLabel" htmlFor="">
                  Full Name
                </label>
                <input
                  className="inputField"
                  type="text"
                  value={payment.fullName}
                  onChange={(e) => {
                    setPayment({ ...payment, fullName: e.target.value });
                  }}
                  required
                />
              </span>
              <span>
                <label className="inputLabel" htmlFor="cardNo">
                  Card No.
                </label>
                <input
                  className="inputField"
                  type="number"
                  id="cardNo"
                  onChange={(e) => {
                    setPayment({ ...payment, cardNo: e.target.value });
                  }}
                  required
                />
              </span>
              <span>
                <label className="inputLabel" htmlFor="expire">
                  Expires
                </label>
                <input
                  type="month"
                  id="expire"
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split("-");
                    setPayment({
                      ...payment,
                      expire: {
                        year: parseInt(year),
                        month: parseInt(month),
                      },
                    });
                  }}
                  required
                />
              </span>
              <span>
                <label className="inputLabel" htmlFor="pin">
                  PIN
                </label>
                <input
                  className="inputField"
                  type="password"
                  id="pin"
                  maxLength={4}
                  onChange={(e) => {
                    setPayment({ ...payment, pin: parseInt(e.target.value) });
                  }}
                  required
                />
              </span>
            </div>
          </div>

          <div id="checkout_bottom">
            <Link to="/cart">
              <button>Back</button>
            </Link>
            <button onClick={cardVerify}>Pay Now</button>
          </div>
        </div>
      ) : (
        <div id="gratitude">
          <h1>Thank you for your purchase!</h1>
          <span>
            {purchase.map((element, i) => {
              const price =
                parseInt(element.amount) * parseInt(element.event.price);
              let date = formatDate(
                new Date(element.event.date).toLocaleDateString("en-GB")
              );
              return (
                <div id="gratitude_list" key={i}>
                  <div id="gratitude_card">
                    <div id="gratitude_left">
                      <div
                        id="gratitude_image"
                        style={{
                          backgroundImage: `url(/img/event/${element.event.picture})`,
                        }}
                      ></div>
                      <div id="gl_div">
                        <p>{element.event.name}</p>
                        <p>{date}</p>
                        <p>{element.event.location}</p>
                      </div>
                    </div>
                    <div id="gratitude_right">
                      <span>
                        <p>${price}.00 USD</p>
                        <p>
                          {element.amount} x ${element.event.price}.00 USD
                        </p>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const obj = {
                            name: element.event.name,
                            location: element.event.location,
                            date: date,
                            image: `/img/event/${element.event.picture}`,
                            purchaseNo: element.purchaseNo,
                          };
                          console.log(obj);
                          setPrint(obj);
                          setToggleB(true);
                        }}
                      >
                        Print
                      </button>
                    </div>
                  </div>
                  <div style={{ margin: "24.5px 0" }} id="border"></div>
                </div>
              );
            })}
          </span>
        </div>
      )}
      {toggleB ? (
        <div id="print_toggle">
          <div id="gratitude_card">
            <PrintEvent
              name={print.name}
              image={print.image}
              location={print.location}
              date={print.date}
              value={`192.168.0.28:9000/api/v1/ecommerce/ticket/${print.purchaseNo}`}
            />
          </div>
          <button
            id="printCard"
            type="button"
            onClick={() => {
              dispatch(
                printAction({
                  name: print.name,
                  image: print.image,
                  location: print.location,
                  date: print.date,
                  value: `192.168.0.28:9000/api/v1/ecommerce/ticket/${print.purchaseNo}`,
                })
              );
              navigate("/printPage");
            }}
          >
            <i class="fa-solid fa-print fa-lg" style={{ color: "#FF48AB" }}></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};
