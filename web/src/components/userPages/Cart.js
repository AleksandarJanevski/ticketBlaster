import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../utils/reusableFunctions";
import { Link } from "react-router-dom";
import { getBasket } from "../../redux/actions/userActions";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userReducer.basket);
  const { id } = useSelector((state) => state.idReducer.id);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (cart.length > 0) {
      setRendered(true);
    }
  }, [cart]);
  const cartRemove = async (item, eventIndex) => {
    try {
      if(!item){
        const response = await fetch(`/api/v1/ecommerce/basket/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          event:cart[eventIndex].event._id,
          beholder:id
        }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        const filter = cart.filter((element) => element.event._id !== cart[eventIndex].event._id);
        dispatch(getBasket(filter));
      }
      }else{
        const response = await fetch(`/api/v1/ecommerce/basket/${item}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        const filter = cart.filter((element) => element._id !== item);
        dispatch(getBasket(filter));
      }
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="cart">
      {id && id ? (
        <>
          <h1>Shopping Cart</h1>
          <div id="cart_mid">
            {cart && cart.length > 0 ? (
              cart.map((element, i) => {
                const price =
                  parseInt(element.amount) * parseInt(element.event.price);
                let date = formatDate(
                  new Date(element.event.date).toLocaleDateString("en-GB")
                );
                return (
                  <div id="cart_events" key={i}>
                    <div id="cart_top">
                      <div id="cart_left">
                        <div
                          id="cart_image"
                          style={{
                            backgroundImage: `url(/img/event/${element.event.picture})`,
                          }}
                        />
                        <div id="cart_left_info">
                          <p>{element.event.name}</p>
                          <p>{date}</p>
                          <p>{element.event.location}</p>
                        </div>
                      </div>
                      <div id="cart_right">
                        <p>${price}.00 USD</p>
                        <p>
                          {element.amount} x ${element.event.price}.00 USD
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            cartRemove(element._id, i);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div id="border"></div>
                  </div>
                );
              })
            ) : (
              <div id="empty_cart">
                <p>No items in cart</p>
              </div>
            )}
          </div>
          <div id="cart_bottom">
            {cart.length > 0 ? (
              <Link to="/">
                <button>Back</button>
              </Link>
            ) : (
              <button style={{ opacity: "0" }}></button>
            )}
            {cart.length > 0 ? (
              <Link to={"/checkout"}>
                <button id="checkoutBtn">Checkout</button>
              </Link>
            ) : (
              <button id="checkoutBtnfaded">Checkout</button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
