import { Link, useNavigate } from "react-router-dom";
import Message from "../LoadingError/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ORDER_CREATE_RESET } from "../../Redux/Constants/OrderConstants";
import { createOrder } from "../../Redux/Actions/OrderActions";
import ImageView from "../Components/ImageView";

const PlaceOrder = () => {
  //const cartItems=[]

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod = "a", shippingAddress } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!shippingAddress) {
    navigate("/ship/");
  }
  if (!paymentMethod) {
    navigate("/choose-payment");
  }

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (order) {
      navigate(`/order/${order._id}`);
    }
  }, [dispatch, success, order]);

  const PlaceOrderHandler = (e) => {
    e.preventDefault();
    const products = []
    cartItems.map((item) => {
      let count = Number.parseInt(item.quantity)
      for (let i=0;i <count;i++ ) {
        products.push(item._id)
      }
    })
    console.log("products: ",products)
    dispatch(
      createOrder({
        products: products,
        user: userInfo._id,
        price: calculateTotalProductPrice(cartItems),
        tax: calculateTax(cartItems),
        ShipCost: 20,
        address: shippingAddress.address,
        city: shippingAddress.city,
        phone: "09839709485",
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        paymentMethod: paymentMethod.paymentMethod,
      })
    );
  };

  const calculateTotalProductPrice = (items) => {
    if (items && items.length >= 1) {
      let total = 0;
      items.map((item) => {
        total += item.price * item.quantity;
      });
      return total.toFixed(1);
    }
    return 0;
  };

  const calculateTax = (items) => {
    return (0.05 * calculateTotalProductPrice(items)).toFixed(1);
  };

  const calculateGrandTotal = (items) => {
    const total = calculateTotalProductPrice(items);
    return (total * 1.05).toFixed(1);
  };
  return (
    <div className="container">
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
              <p>{userInfo.username}</p>
              <p>{userInfo.email}</p>
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
              <p>Shipping: {shippingAddress.country}</p>
              <p>Pay method: {paymentMethod.paymentMethod}</p>
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
              <p>
                Address: {shippingAddress.address}, {shippingAddress.city}
              </p>
              <p>Postal Code: {shippingAddress.postalCode} </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex justify-between m-3">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <Message variant={"info mt-5"}>Your cart is empty</Message>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <>
                  <div className="row" key={index}>
                    <div className="col-md-3 col-6">
                      {item ? (
                        !item.thumbnail || item.thumbnail.includes("http") ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className=""
                          />
                        ) : (
                          <ImageView
                            imagePath={item.thumbnail}
                            imageName={item.title}
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
                          {item.title}
                        </h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 flex flex-column items-center justify-center">
                      <h4>QUANTITY</h4>
                      <h6>{item.quantity}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 flex flex-column justify-center items-end">
                      <h4>SUBTOTAL</h4>
                      <h6>
                        <strong className="font-mono">
                          $ {Number.parseInt(item.quantity) * item.price}
                        </strong>
                      </h6>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </div>

        <div className="col-lg-3 flex flex-column items-end mt-5">
          <table className="table table-bordered bg-[#f1f5f9] ">
            <tbody>
              <tr>
                <td>
                  <strong>Products</strong>
                </td>
                <td>${calculateTotalProductPrice(cart.cartItems)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shipping</strong>
                </td>
                <td>$20</td>
              </tr>
              <tr>
                <td>
                  <strong>Tax</strong>
                </td>
                <td>${calculateTax(cart.cartItems)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>${calculateGrandTotal(cart.cartItems)}</td>
              </tr>
            </tbody>
          </table>

          {cartItems.length === 0 ? null : (
            <Link
              to="/order"
              className="text-white bg-primary w-full text-center p-3 rounded-sm"
              onClick={PlaceOrderHandler}
            >
              <button type="submit" className="text-center">
                PLACE ORDER
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
