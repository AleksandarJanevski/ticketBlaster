import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils/reusableFunctions";
import { Link, useNavigate } from "react-router-dom";
import { getBasket } from "../../../redux/actions/userActions";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.userReducer.basket);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user]);

  const cartRemove = async (item, eventIndex) => {
    try {
      const response = await fetch(`/api/v1/ecommerce/basket`, {
        method: "DELETE",
        body: JSON.stringify({
          event: item,
        }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        const filter = cart.filter((element) => element.event._id !== item);
        dispatch(getBasket(filter));
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="cart">
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
                          cartRemove(element.event._id, i);
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
          {/* <Link to="/">
                 <button>
                   Back
                 </button>
               </Link> */}
          {cart.length > 0 ? (
            <button
              id="backButton"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Back
            </button>
          ) : (
            <button style={{ opacity: "0" }}></button>
          )}
          {cart.length > 0 ? (
            <Link to={"/checkout"}>
              <button id="checkoutBtn">Checkout</button>
            </Link>
          ) : (
            <button type="button" id="checkoutBtnfaded">
              Checkout
            </button>
          )}
        </div>
      </>
    </div>
  );
};
