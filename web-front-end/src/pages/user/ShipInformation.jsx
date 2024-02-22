import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../Redux/Reducers/CartReducers";

const ShipInformation = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("shipping: ", shippingAddress);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [country, setCountry] = useState(shippingAddress?.country);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/place-order");
  };
  return (
    <div>
      <div className="flex flex-column items-center">
        <div className=" w-max-[500px] mx-auto w-2/3">
          <form
            className="p-4 rounded-lg border-2 border-solid bg-white flex flex-column items-center w-full"
            onSubmit={submitHandler}
          >
            <p className="font-bold text-2xl font-mono mb-3">
              DELIVERY ADDRESS
            </p>
            <input
              type="text"
              name="address"
              className="p-3 font-serif rounded-lg border-2 border-solid text-slate-500 text-xl w-full my-2"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>

            <input
              type="text"
              name="city"
              className="p-3 font-serif rounded-lg border-2 border-solid text-slate-500 text-xl w-full my-2"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>

            <input
              type="text"
              name="country"
              className="p-3 font-serif rounded-lg border-2 border-solid text-slate-500 text-xl w-full my-2"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>

            <input
              type="text"
              name="postalcode"
              className="p-3 font-serif rounded-lg border-2 border-solid text-slate-500 text-xl w-full my-2"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>

            <button
              className="text-white bg-blue-500 rounded-lg w-full my-3 py-3 "
              type="submit"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipInformation;
