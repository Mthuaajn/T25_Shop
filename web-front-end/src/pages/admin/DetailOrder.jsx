import { faCalendar, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import { useEffect, useState } from "react";
import Message from "../LoadingError/Message";
import { useDispatch, useSelector } from "react-redux";
import ImageView from "../Components/ImageView";
import { deliverOrder, listOrderDetails } from "../../Redux/Actions/OrderActions";
import DateView from "../Components/DateView";
import { ORDER_DELIVERED_RESET } from "../../Redux/Constants/OrderConstants";


const DetailOrder = () => {
    const [deliverySwitch, setDeliverySwitch] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params
    const orderDetails = useSelector((state) => state.orderDetails)
    const { loading, error, order } =  orderDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDelivered, error: errorDelivered, success: successDelivered }= orderDeliver

    useEffect(() => {
       dispatch(listOrderDetails(id))
       if (successDelivered) {
            dispatch({type: ORDER_DELIVERED_RESET})
            
       }
    },[dispatch, id, successDelivered])

    const deliveryHandler = (e) => {
        e.preventDefault()
        if (!order.StatusDelivered) {
            dispatch(deliverOrder(id))
        }
       
    }

    // let loading = false
    // let error = null
    // const order = {
    //     _id: "1234",
    //     date:"12/03/2024",
    //     items:[
    //         {
    //             price: 100,
    //             quantity:3,
    //             title: "hiter",
                
    //         },
    //         {
    //             price: 100,
    //             quantity:3,
    //             title: "hiter",
                
    //         }
    //     ],

    // }
    // const item = {
    //     price: 100,
    //     quantity:3,
    //     title: "hiter",
        
    // }
    const calculateSubtotal = (order) => {
        if (order && order.items && order.items.length>0)
        {
            let total=0
            order.items.map((item) => { 
                total+=item.quantity*item.price
            })
            return total
        }
        return 0
    }
    const calculateGrandTotal = (order) => {
        return calculateSubtotal(order) +20
    }
    const setDeliveryStatus = () => {
        setDeliverySwitch(!deliverySwitch)
    } 
    return (
        <div className="main">
            <div className="header">
                <Link to="/admin/orders" className="p-2 bg-dark text-white rounded-lg">
                    Back To Orders
                </Link>
            </div>

            { 

                loading ? (<Loading/>) : error ? (
                    <Message variant="danger w-full" >{error}</Message>
                ) : (               
                        order && (
                            <div className="card m-2">
                        <header className="card-header p-3 header-green bg-[#818cf8]">
                            <div className="row flex flex-row items-center">
                                <div className="col-lg-6 col-md-6">
                                    <span className="">
                                        <FontAwesomeIcon icon={faCalendar} className="mx-2"/>
                                        <b className="text-white"><DateView  date={order?.createdAt}/></b>
                                    </span>
                                    <br/>
                                    <small className="text-white mx-3">
                                        Order ID: {order._id}
                                    </small>
                                </div>

                                <div className="col-lg-6 col-md-6 ms-auto flex flex-row justify-end">
                                    <select className="form-select inline-block"
                                            style={{ maxWidth:"200px" }}>
                                            <option value={""}>Change status</option>
                                            <option value={""}>Awaiting Payment</option>
                                            <option value={""}>Confirmed</option>
                                            <option value={""}>Shipped</option>
                                    </select>

                                    <Link className="rounded-lg p-2 bg-success ms-2" to="#">
                                        <FontAwesomeIcon icon={faPrint}/>
                                    </Link>
                                </div>
                            </div>
                        </header>
                        {
                            order && (
                                <div className="card-body">
                                    <div className="row m-4 ">
                                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-sm-0 alert-primary  px-3 py-5">
                                            <div className="row">
                                                <div className="col-md-4 center">
                                                    <div  className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                                                        <i className="fas fa-user"></i>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 center">
                                                    <h5>
                                                        <strong>Customer</strong>
                                                    </h5>
                                                    <p>{order?.user?.username}</p>
                                                    <p><u className="italic">
                                                        <Link to={`mailto:${order?.user?.email}`}>
                                                            {order?.user?.email}
                                                        </Link>
                                                    </u></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 alert-primary   px-3  py-5">
                                            <div className="row">
                                                <div className="col-md-4 center">
                                                    <div  className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                                                        <i className="fas fa-truck-moving"></i>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-md-8 center">
                                                    <h5>
                                                        <strong>Order Info</strong>
                                                    </h5>
                                                    <p>Shipping: {order?.country}</p>
                                                    <p>Pay method: {order?.paymentMethod}</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 alert-primary px-3  py-5">
                                            <div className="row">
                                                <div className="col-md-4 center">
                                                    <div  className="rounded-full bg-[#bae6fd] px-1 py-5 text-center text-2xl">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-md-8 center">
                                                    <h5>
                                                        <strong>Deliver to</strong>
                                                    </h5>
                                                    <p>
                                                        Address: {order.address}, {` ${order.city}`}
                                                    </p>
                                                    <p>Postal Code:{" "}{order.postalCode}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-9">
                                            <div className="table-responsive">
                                                <table className="w-full table ">
                                                    <tr>
                                                        <th className="font-normal text-left text-[#96A5B8]">Product</th>
                                                        <th className="font-normal text-[#96A5B8]">Unit Price</th>
                                                        <th className="font-normal text-[#96A5B8]">Quantity</th>
                                                        <th className="font-normal text-[#96A5B8]">Subtotal</th>
                                                </tr>
                                                {
                                                    
                                                        order.statsProductPrice && order.statsProductPrice.length > 0 ? (
                                                            order.statsProductPrice.map((item ) => (
                                                                <tr>
                                                                    <td className="flex flex-row justify-begin">
                                                                        {
                                                                            item ? (
                                                                                !item.imageProduct || item.imageProduct.includes('http') ? (
                                                                                    <img src={item.imageProduct} alt={item.nameProduct} className="max-h-[70px] max-w-[70px]"/>
                                                                                ) : (
                                                                                    <ImageView imagePath={item.imageProduct} imageName={item.nameProduct} model={'product'} id={item._id} classProp={"max-h-[70px] max-w-[70px]"}/>
                                                                                )
                                                                            ) : null
                                                                        
                                                                        }
                                                            
                                                                        
                                                                        <div>{item.nameProduct}</div>
                                                                    </td>
                                                                    <td className="">${(Number.parseFloat(item.totalPrice)/Number.parseFloat(item.quantityProduct)).toFixed(1)}</td>
                                                                    <td className="">{item.quantityProduct}</td>
                                                                    <td className="">${item.totalPrice}</td>
                                                                </tr>
                                                            )
                                                            
                                                    
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={12}>
                                                                    <Message variant={"primary flex justify-center"}>Empty order</Message>
                                                                </td>
                                                            </tr>
                                                            
                                                        )
                                                }
                                                    <tr >
                                                        <td colSpan={12} className="flex flex-row justify-end">
                                                            <table className="table table-bordered bg-[#f1f5f9] ">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Subtotal</strong>
                                                                        </td>
                                                                        <td>${order.price && order.tax && order.ShipCost ? 
                                                                                parseInt(order.price) - parseInt(order.tax) - parseInt(order.ShipCost) : 0}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Tax</strong>
                                                                        </td>
                                                                        <td>
                                                                            ${order.tax ? order.tax :0}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Shipping cost</strong>
                                                                        </td>
                                                                        <td>${order.ShipCost ? order.ShipCost : 0}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Grand total</strong>
                                                                        </td>
                                                                        <td>${order.price ? order.price : 0}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Status</strong>
                                                                        </td>
                                                                        <td>
                                                                        {
                                                                            order && (
                                                                                order.StatusPaid ? (
                                                                                    <span className="alert-success text-success p-2 rounded-lg">
                                                                                        Payment done
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="alert-danger text-danger p-2 rounded-lg">
                                                                                        Not Paid
                                                                                    </span>
                                                                                )
                                                                            )
                                                                        }                                                                          
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                
                                                
                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="box ">
                                                <div className="border w-4/5 p-3 shadow-sm rounded-lg bg-light" >
                                                   { 
                                                        loadingDelivered ? <Loading/> : errorDelivered
                                                        ? (<Message variant={'danger'}>{errorDelivered}</Message>)
                                                        : (
                                                            <button className=" col-12 text-white" onClick={(e) => deliveryHandler(e)} disabled={!order.StatusPaid} style={ !order.StatusPaid ? {opacity: '0.5'} : {opacity:'1'}}>
                                                            {
                                                                order && order.StatusDelivered  ? (
                                                                    <span className="bg-success rounded-lg  p-2">DELIVERED</span>
                                                                ) : (
                                                                    <>
                                                                    
                                                                        
                                                                        <span className="bg-dark rounded-lg p-2">MARK AS DELIVERED</span>
                                                                    </>
                                                                
                                                                )
                                                            } 
                                                            </button>
                                                        )

                                                    }
                                                       
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                       
                    </div>
                        )
                   
                )
            }
          
        </div>
    )
}

export default DetailOrder;