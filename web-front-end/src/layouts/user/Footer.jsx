import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-column items-between justify-around  bg-blue-500 text-gray-300 p-4 mt-20">
      <div className="flex flex-row justify-center my-3">
        <div className="flex flex-row justify-center text-xl">
          <Link
            to=""
            className="mx-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link
            to=""
            className="mx-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i className="fab fa-instagram"></i>
          </Link>
          <Link
            to=""
            className="mx-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link
            to=""
            className="mx-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i className="fab fa-youtube"></i>
          </Link>
          <Link
            to=""
            className="mx-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i className="fab fa-pinterest-p"></i>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-10 my-1 font-bold">
        <div>
          <Link reloadDocument to="/">
            Home
          </Link>
        </div>
        <div>
          <Link to="#">Services</Link>
        </div>
        <div>
          <Link to="#">About</Link>
        </div>
        <div>
          <Link to="#">Term</Link>
        </div>
        <div>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div>
          Group 09 <span>&copy;</span> 2023
        </div>
      </div>
    </div>
  );
};

export default Footer;
