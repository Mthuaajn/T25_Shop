import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { logout } from "../../Redux//Actions/UserActions";
import { useEffect, useRef, useState } from "react";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { api } from "../../constants/api";
const Header = ({ title, setTitle }) => {
  const ref = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(-1);

  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    state.cart;
  });
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const handler = (event) => {
      if (isMenuOpen && ref.current && !ref.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isMenuOpen]);

  const logoutHandler = () => {
    //e.preventDefault()
    dispatch(logout());
  };

  const [menuItemsData, setMenuItemsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(api.getAllCategory, api.config);
      if (res.data.status === "success") {
        const data = res.data.data.data;
        setMenuItemsData(
          data.map((item) => ({
            id: item._id,
            title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            url: "/product?category=" + item.name + "&page=1",
            submenu: item.subCategory.map((subitem) => ({
              title:
                subitem.name.charAt(0).toUpperCase() + subitem.name.slice(1),
              url:
                "/product?category=" +
                item.name +
                "&title[regex]=" +
                subitem.name +
                "&page=1",
            })),
          }))
        );
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="h-[40px] bg-blue-500">
        <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-4">
          <div className="flex gap-24 text-white items-center">
            <p>0987654321</p>
            <p>abc@gmail.com</p>
          </div>
          <div className="announcement  text-white">
            <Container>
              <Row>
                <Col className="">
                  <Link to="" className="mx-3">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Link>
                  <Link to="" className="mx-3">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="" className="mx-3">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link to="" className="mx-3">
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link to="" className="ml-3">
                    <i className="fab fa-pinterest-p"></i>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <div className="header max-w-screen-xl mt-2 h-[80px] flex justify-between items-center px-4 mx-auto">
        <div className="container">
          <div className="mobile-header hidden">
            <div className="container">
              <div className="row">
                <div className="col-6 flex align-center">
                  <Link className="navbar-brand" to="/">
                    <img src="logo.png" alt="logo" width={200} />
                  </Link>
                </div>
                <div className="col-6 flex items-center justify-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user"></i>
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Logout
                      </Link>
                    </div>
                  </div>

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{4}</span>
                  </Link>
                </div>

                <div className="col-12 flex items-center">
                  <form className="input-group">
                    <input
                      type="search"
                      className="form-control rounded-full search"
                      placeholder="Search"
                    ></input>
                    <button type="submit" className="search-button"></button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="pc-header h-[80px] mt-2">
            <Row>
              <div className="col-xs-3 col-3 flex items-center">
                <Link className="navbar-brand flex items-center" to="/">
                  <img src="/images/dummy.png" alt="logo" width={50} />
                  <div className="text-sm font-semibold leading-3">
                    <p>SUPER</p>
                    <p className="text-blue-500">STORE</p>
                  </div>
                </Link>

                <Link to="/product" className="">
                    <button className=" bg-blue-400 rounded-xl p-2 text-white m-3 ">
                           <FontAwesomeIcon icon={faShoppingCart}/> 
                        </button>
                </Link>

                <div
                  ref={ref}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="cursor-pointer relative flex items-center gap-2 bg-blue-400 text-white px-2 py-2 rounded-sm"
                >
                  <FontAwesomeIcon icon={faBars} size="lg" />
                  <p className="text-sm font-semibold">Danh mục</p>
                  {isMenuOpen && (
                    <div className="absolute z-10 top-10 text-black bg-white shadow-xl  min-w-[107px] -left-[1px] rounded-sm flex flex-col gap-1">
                      {menuItemsData.map((item, index) => (
                        <div
                          onClick={() => navigate(item.url)}
                          className="cursor-pointer relative hover:bg-blue-400 hover:text-white py-1 text-left pl-2 pr-5"
                          key={index}
                          onMouseEnter={() => {
                            if (item.submenu.length > 0) {
                              setIsSubMenuOpen(index);
                            }
                          }}
                        >
                          {item.title}
                          {item.submenu.length > 0 && (
                            <span className="absolute right-1">&gt;</span>
                          )}
                          {isSubMenuOpen === index && (
                            <div className="absolute  text-black bg-white shadow-xl top-[-1px] left-[122px] rounded-sm flex flex-col gap-1">
                              {item.submenu.map((subitem, subindex) => (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(subitem.url);
                                    setIsMenuOpen(false);
                                  }}
                                  className="hover:bg-blue-400 hover:text-white py-1 text-left pl-2 pr-5"
                                  key={subindex}
                                >
                                  {subitem.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-xs-6 col-6 flex items-center">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control rounded-full search outline-none"
                    placeholder="Search"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                  <button
                    className="text-white bg-black rounded-full px-3"
                    onClick={() => {
                      const currentUrl = location.pathname;
                      if (currentUrl !== "/product") {
                        if (title !== "") {
                          navigate("/product?page=1&title[regex]=" + title);
                        } else {
                          navigate("/product");
                        }
                      } else {
                        setSearchParams((params) => {
                          if (title !== "") {
                            params.set("title[regex]", title);
                          } else {
                            params.delete("title[regex]");
                          }
                          return params;
                        });
                      }
                    }}
                  >
                    SEARCH
                  </button>
                </div>
              </div>
              <div className="col-xs-3 col-3 flex items-center justify-end">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Link to="/profile">
                        <i className="fas fa-user"></i>
                        Hi, {userInfo.username}
                      </Link>
                    </button>

                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                    <Link to="/cart" className="mx-3">
                      <i className="fas fa-shopping-bag"></i>
                      {/* <span className="badge">{4}</span> */}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link className="uppercase mr-6 font-semibold" to="/signup">
                      Sign up
                    </Link>
                    <Link className="uppercase font-semibold" to="/login">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
