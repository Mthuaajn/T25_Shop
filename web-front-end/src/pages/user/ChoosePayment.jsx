import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../Redux/Reducers/CartReducers";

const ChoosePayment = ()=> {

    const cart = useSelector((state)=>state.cart)
    const { shippingAddress, paymentMethod } = cart
    const dispatch = useDispatch()
    const [paymentMethodOption, setPaymentMethodOption] = useState("VNPay")
    const navigate = useNavigate()

    if (!shippingAddress) {
        navigate("/ship/")
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod: paymentMethodOption}))
        navigate("/place-order")
    }
    return (
        <div className="flex flex-column items-center" >
            <div className="w-max-[500px] mx-auto w-1/2">
                <form className="p-4 rounded-lg border-2 border-solid bg-white flex flex-column items-center w-full" onSubmit={submitHandler}>
                    <p className="font-bold text-2xl font-mono mb-3">SELECT PAYMENT METHOD</p>
                    
                    <div className="payment-container w-full">
                        <div className="radio-container p-3 flex flex-column">
                            <div>
                                <input className="form-check-input me-3" 
                                        type="radio" name="group1" 
                                        value={`VNPay`} 
                                        checked={paymentMethodOption === 'VNPay'}
                                        onChange={(e)=>setPaymentMethodOption(e.target.value)}
                                        />
                                <label className="form-check-label font-semibold text-xl">VNPay</label>
                            </div>
                            <div>
                                <input className="form-check-input me-3" 
                                        type="radio" name="group1" 
                                        value={`Paypal`}
                                        checked={paymentMethodOption === 'Paypal'}
                                        onChange={(e)=>setPaymentMethodOption(e.target.value)}
                                        />
                                <label className="form-check-label  font-semibold text-xl">Paypal</label>
                            </div>
                        </div>
                    </div>
                    <button className="text-white bg-blue-500 rounded-lg w-full my-3 py-3 " type="submit">
                            CONTINUE
                    </button>
                        
                </form>
            </div>
        </div>
    )
}

export default ChoosePayment;