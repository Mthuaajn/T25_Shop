import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../LoadingError/Message";
import ImageView from "../Components/ImageView";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../../Redux/Constants/OrderConstants";
import Loading from "../LoadingError/Loading";
import { clearCart } from "../../Redux/Actions/CartActions";
import { ToastContainer, toast } from "react-toastify";

const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod, shippingAddress } = cart;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error } = orderDetails;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  // const order = {
  //     _id:"23498rhq92345u8q2359",
  //     price:100,
  //     total:120,
  //     paidStatus:true,
  //     deliveryStatus:true,
  // }

  // let error=null
  // let loading=false
  const fetchOrder = async (id) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          sessionId: userInfo.sessionId,
        },
        withCredentials: true,
      };

      const { data } = await axios.get(api.getOneOrderUser + id, config);

      console.log("data order: ", data);
      setOrder(data.data.data);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ORDER_DETAILS_FAIL });
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);
  const purchaseHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      api.checkout,
      { total: order.price + order.tax + order.ShipCost, orderId: id },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          sessionId: userInfo.sessionId,
        },
        withCredentials: true,
      }
    );

    if (res.data === "success") {
      const res1 = await axios.patch(
        api.updateOrder + id,
        { StatusPaid: true },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            sessionId: userInfo.sessionId,
          },
          withCredentials: true,
        }
      );
      if (res1.data.status === "success") {
        dispatch(clearCart());
        window.location.reload();
      } else {
        toast.error(res1.data);
      }
    } else {
      toast.error(res.data);
    }
  };
  const getErrorMessage = (errorCategory) => {
    return errorCategory.response && errorCategory.response.data.message
      ? errorCategory.response.data.message
      : errorCategory.message;
  };
  return (
    <>
      <div className="container">
        <ToastContainer />
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant={"danger"}>{getErrorMessage(error)}</Message>
        ) : (
          <>
            <div className="row m-4 ">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-sm-0 alert-primary bg-blue-500 px-3 py-5 ">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center text-white">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    {order && order.user ? (
                      <>
                        <p>{order.user?.username}</p>
                        <p>{order.user?.email}</p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 alert-primary  bg-blue-500  px-3  py-5">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center  text-white">
                    <h5>
                      <strong>Order Info</strong>
                    </h5>
                    {order && (
                      <>
                        <p>Shipping: {order.country}</p>
                        <p>Pay method: {order.paymentMethod}</p>
                      </>
                    )}

                    {order.StatusPaid ? (
                      <div className="bg-success w-2/3 text-center text-2xl p-2 mt-2">
                        PAID
                      </div>
                    ) : (
                      <div className="bg-danger w-2/3 text-center text-2xl p-2 mt-2">
                        NOT PAID
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 alert-primary  bg-blue-500  px-3  py-5">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center  text-white">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    {order && (
                      <>
                        <p>
                          Address: {order.address}, {order.city}
                        </p>
                        <p>Postal Code: {order.postalCode} </p>
                        {order.StatusDelivered ? (
                          <div className="bg-success w-2/3 text-center text-2xl p-2 mt-2">
                            DELIVERED
                          </div>
                        ) : (
                          <div className="bg-danger w-2/3 text-center text-2xl p-2 mt-2">
                            NOT DELIVERED
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row flex justify-between m-3">
              <div className="col-lg-8">
                {order &&
                  (!order.statsProductPrice || order.statsProductPrice.length === 0 ? (
                    <Message variant={"info mt-5"}>Your cart is empty</Message>
                  ) : (
                    <>
                      {order.statsProductPrice.map((item, index) => (
                        <>
                          <div className="row mt-2" key={index}>
                            <div className="col-md-3 col-6">
                              {item ? (
                                !item.imageProduct ||
                                item.imageProduct.includes("http") ? (
                                  <img
                                    src={item.imageProduct}
                                    alt={item.nameProduct}
                                    className=""
                                  />
                                ) : (
                                  <ImageView
                                    imagePath={item.imageProduct}
                                    imageName={item.nameProduct}
                                    model={"product"}
                                    id={item._id}
                                    classProp={""}
                                  />
                                )
                              ) : null}
                            </div>

                            <div className="col-md-5 col-6 flex flex-row items-center">
                              <Link to={`/product/${item._id}`}>
                                <h6 className="font-semibold font-mono">
                                  {item.nameProduct}
                                </h6>
                              </Link>
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6 flex flex-column items-center justify-center">
                              <h4>QUANTITY</h4>
                              <h6>{item.quantityProduct}</h6>
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6 flex flex-column justify-center items-end">
                              <h4>SUBTOTAL</h4>
                              <h6>
                                <strong className="font-mono">
                                  ${" "}
                                  {item.totalPrice}
                                </strong>
                              </h6>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  ))}
              </div>

              <div className="col-lg-3 flex flex-column items-end mt-5">
                <table className="table table-bordered bg-[#f1f5f9] ">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>${order.price}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${order.ShipCost}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>${order.tax}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order.price + order.tax + order.ShipCost}</td>
                    </tr>
                  </tbody>
                </table>

                {order.products === 0 ? null : !order.StatusPaid ? (
                  <>
                    <Link
                      to="/purchase"
                      className="text-white bg-primary w-full text-center p-3 rounded-sm"
                      onClick={purchaseHandler}
                    >
                      <button type="submit" className="text-center">
                        PURCHASE
                      </button>
                    </Link>


                  <Link
                    to="https://localhost:3003/login" target="_blank"
                    className="text-white bg-primary w-full text-center p-3 rounded-sm mt-3"
                   
                  >
                    <button type="submit" className="text-center">
                      PAYMENT SERVER
                    </button>
                  </Link>
                 
                 


                  </>
                ) : !order.StatusDelivered ? (
                  <Link
                    to=""
                    className="text-white bg-primary w-full text-center p-3 rounded-sm"
                    onClick={(e) => e.preventDefault()}
                    aria-disabled
                    disabled
                  >
                    <button type="submit" className="text-center" disabled>
                      ON SHIPPING
                    </button>
                  </Link>
                ) : (
                  <Link
                    to={``}
                    className="text-white bg-primary w-full text-center p-3 rounded-sm"
                    onClick={(e) => e.preventDefault()}
                    aria-disabled
                    disabled
                  >
                    <button type="submit" className="text-center" disabled>
                      DELIVERED
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
