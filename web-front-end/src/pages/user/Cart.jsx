import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  addTocart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../Redux/Actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Row } from "react-bootstrap";
import Message from "../LoadingError/Message";
import axios from "axios";
import { api } from "../../constants/api";
import { ToastContainer, toast } from "react-toastify";
import ImageView from "../Components/ImageView";

const Cart = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems
    .reduce((a, i) => a + i.quantity * i.price, 0)
    .toFixed(2);

  const productId = params.id;
  const quantity = searchParams.get("quantity");

  useEffect(() => {
    if (productId) {
      dispatch(addTocart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const increaseProductQuantity = (product) => {
    if (product.quantity + 1 <= product.stock) {
      dispatch(increaseQuantity(product._id));
    }
  };
  const decreaseProductQuantity = (product) => {
    if (product.quantity - 1 >= 1) {
      dispatch(decreaseQuantity(product._id));
    }
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const checkOutHandler = async (e) => {
    e.preventDefault();
    navigate("/ship");
  };

  const removeFromCardHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container max-w-screen-xl mt-4">
      <ToastContainer />
      {cartItems.length === 0 ? (
        <>
          <Alert className="text-center mt-3 mx-3" variant="info">
            Your cart is empty now
            <Link
              className="btn-success mx-5 px-5 p-3 rounded-full"
              to="/product"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </Alert>
          <div className="h-full"> </div>
        </>
      ) : (
        <>
          <div className="row flex flex-row justify-center m-2 text-center font-semibold">
            <Message className="cart-item ">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </Message>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex-1 gap-2 flex flex-col">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="cart-item flex gap-2 p-2 rounded-lg border-2 border-solid bg-white mx-2"
                >
                  <Link
                    to={`/product/${item._id}`}
                    className="cart-image flex gap-2 flex-1"
                  >
                    {item ? (
                      !item.thumbnail || item.thumbnail.includes("http") ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-[100px] h-[100px]"
                        />
                      ) : (
                        <ImageView
                          imagePath={item.thumbnail}
                          imageName={item.title}
                          model={"product"}
                          id={item._id}
                          classProp={"w-[100px] h-[100px]"}
                        />
                      )
                    ) : null}

                    <div
                      to={`/product/${item._id}`}
                      className="font-mono font-bold mt-2 flex items-center"
                    >
                      <p>{item.title}</p>
                    </div>
                  </Link>

                  <div className="flex-1 cart-quantity col-md-2 col-sm-5 mt-3 mt-md-0 flex flex-column items-center justify-center">
                    <h6 className=" text-slate-500 font-semibold mb-2">
                      Quantity
                    </h6>
                    <div className="flex justify-start items-center">
                      <button
                        className="bg-[#16a34a] text-white rounded-full w-6 h-6 font-bold text-xl"
                        onClick={() => increaseProductQuantity(item)}
                      >
                        <span className="relative bottom-[4px]">+</span>
                      </button>
                      <input
                        type="text"
                        readOnly
                        name="quantity"
                        className="w-[40px] outline-none text-center bg-gray-200 rounded-xl mx-2"
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                      ></input>

                      <button
                        className="bg-[#b91c1c] text-white rounded-full w-6 h-6  font-bold text-xl"
                        onClick={() => decreaseProductQuantity(item)}
                      >
                        <span className="relative bottom-[4px]">-</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center gap-4">
                    <div className="cart-price ">
                      <h6 className="font-semibold  text-slate-500">
                        Sub Total
                      </h6>
                      <p className="font-bold text-lg">
                        {item.price * item.quantity} VNĐ
                      </p>
                    </div>
                    <div
                      onClick={() => removeFromCardHandler(item._id)}
                      className="remove-button flex flex-row justify-start items-center "
                    >
                      <i className="fas fa-times bg-[#ef4444] text-white w-8 h-8 flex items-center justify-center rounded-full"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <div className="flex justify-end my-4">
                <span className="sub font-semibold text-gray text-slate-500 text-xl mr-2">
                  TOTAL:
                </span>
                <span className="total-price text-xl font-bold ">
                  {total} VNĐ
                </span>
              </div>
              <div className="cart-buttons flex align-center text-white my-4">
                <Link to="/product" className="mx-auto min-w-[200px]">
                  <button className="bg-primary p-3 rounded-lg mx-auto  px-6">
                    Continue To Shopping
                  </button>
                </Link>

                {total > 0 && (
                  <button
                    className="bg-success p-3 rounded-lg mx-auto  min-w-[200px]"
                    onClick={checkOutHandler}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
