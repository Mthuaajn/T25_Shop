import React, { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import { api } from "../../constants/api";
import Rating from "./Rating";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Message";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ImageView from "../Components/ImageView";

export default function Home() {
  const dispatch = useDispatch();

  //USE TO GET PRODUCT FROM API, DO NOT DELETE

  //const productList = useSelector((state) =>  state.productList)
  //const { loading, error, products } = productList
  // useEffect(() => {
  //   dispatch(listProduct());
  // }, [dispatch])

  const loading = false;
  const error = false;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(api.getAllCategory, api.config);
      if (res.data.status === "success") {
        const data = res.data.data.data;
        setCategories(
          data.map((item) => ({
            id: item._id,
            value: item.name,
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            image: "./images/dummy.png",
            subCategories: item.subCategory.map((subitem) => ({
              id: subitem._id,
              name: subitem.name,
            })),
          }))
        );
      }

      const res2 = await axios.get(api.getTodayProducts, api.config);
      if (res2.data.status === "success") {
        setProducts(res2.data.data.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container max-w-screen-xl mt-4">
      <div className="mx-3 px-4 py-3 bg-white ">DANH MỤC</div>
      <div className=" mx-3 flex flex-wrap mb-4 gap-x-2">
        {categories.map((item) => (
          <Link
            to={"/product?category=" + item.value + "&page=1"}
            key={item.id}
            className="bg-white flex-grow-1 w-28 flex items-center justify-start flex-col pb-3 mt-2"
          >
            <div className="h-[70px] flex items-end">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f5f5f5]">
                <img src={item.image} alt="" />
              </div>
            </div>
            <p className="text-center">{item.name}</p>
          </Link>
        ))}
        <Link
          to={"/product"}
          className="bg-gray-300 flex-grow-1 mt-2  w-28 flex items-center justify-center flex-col py-4"
        >
          <p className="text-center">
            Tất cả <br></br> sản phẩm
          </p>
        </Link>
      </div>
      <div className="mx-3 px-4 py-3 bg-white mb-2 text-center text-blue-500 font-semibold border-b-[4px] border-blue-500">
        GỢI Ý HÔM NAY
      </div>
      <div className="section">
        <Row>
          <Col className="article">
            <div className="shopcontainer grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3 mx-3">
              {loading ? (
                <div className="my-5">
                  <Loading />
                </div>
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>
                  {products.map((product) => (
                    <div
                      className="shop w-full p-2 rounded-lg border-2 border-solid bg-white"
                      key={product._id}
                    >
                      <div className="border-product">
                        <Link to={`/product/${product._id}`}>
                          <div className="shopBack">
                          
                            {
                              product ? (
                                !product.thumbnail || product.thumbnail.includes('http') ? (
                                  <img
                                    src={product?.thumbnail}
                                    alt={product?.title}
                                    height="100px"
                                    className="bg-[#bbf7d0] h-[250px] object-cover"
                                  />
                                ) : (
                                  <ImageView  height="100px" imagePath={product.thumbnail} 
                                              imageName={product.title} model={'product'} 
                                              id={product._id} 
                                              classProp={"bg-[#bbf7d0] h-[250px] object-cover"}/>                         
                                )
                              ) : null
                            
                            }
                            
                          </div>
                        </Link>

                        <div className="shoptext">
                          <div>
                            <Link
                              to={`/product/${product._id}`}
                              className="font-serif"
                            >
                              {product.title}
                            </Link>
                            <Rating
                              value={product.rating}
                              text={`${product.ratingsQuantity} reviews`}
                            ></Rating>
                            <h3 className="text-2xl font-bold">
                              ${product.price}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
//col-lg-4 col-md-6 col-sm-6
