/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Rating from "../user/Rating";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../LoadingError/Message";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../Redux/Actions/ProductActions";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import Loading from "../LoadingError/Loading";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createReview, listReviewProduct } from "../../Redux/Actions/ReviewActions";
import { REVIEW_CREATE_RESET } from "../../Redux/Constants/ReviewConstants";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ImageView from "../Components/ImageView";
const ProductDetail = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const params = useParams();
  const userLogin = useSelector((state) => state.userLogin)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const toastId = useState(null)
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = params
  const reviewList = useSelector((state) => state.reviewList)
  const { loading: loadingReviewList, error: errorReviewList, reviews } = reviewList

  const reviewCreate = useSelector((state)=> state.reviewCreate)
  const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate } = reviewCreate
  const ToastObjects = {
    pauseOnFoccusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
  useEffect(() => {
    const fetchProduct = async () => {
      const res1 = await axios.get(api.getAndCreateProduct + params.id);

      console.log("data: ",res1.data)
      if (res1.data.status === "success") setProduct(res1.data.data.data);

      const res2 = await axios.get(api.getRelatedProduct + params.id);
      if (res2.data.status === "success")
        setRelatedProducts(res2.data.data.data);
    };

    fetchProduct();
    dispatch(listReviewProduct(id))    
    if (successReviewCreate) {
      dispatch({ type: REVIEW_CREATE_RESET})
      setRating(5)
      setComment("")
    }
  }, [params.id, dispatch, successReviewCreate]);

  
  const loading = false;
  const error = false;

  const addToCartHandler = (e) => {
    e.preventDefault();
    //history.push(`/cart/${product._id}?${quantity}`);
    navigate(`/cart/${product?._id}?quantity=${quantity}`);
  };

  const increaseProduct = (e) => {
    e.preventDefault();
    if (quantity + 1 <= product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseProduct = (e) => {
    e.preventDefault();
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const submitHandler = (e) => {
      e.preventDefault()
      if (comment==="") {
        return alert("Please write some comment!")
      }

      dispatch(createReview(id,rating, comment))

  }
  const showToast = () => {
    toast.success('Success!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((review, index) => (
            <div className="mb-5 mb-md-3 bg-[#f1f5f9] p-3 shadow-sm rounded-lg" key={review._id}>
                      <strong>{
                        review.user && review.user.username ? (
                          review.user.username
                        ) : (
                          <>Anonymous customer</>
                        )
                      }
                      </strong>
                      <Rating value={review.rating} />
                      <span>{review.createdAt}</span>
                      <Alert key="info" variant="info" className="mt-3">
                        {review.review}
                      </Alert>
                    </div>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage, itemList }) {
   // console.log("item: ", itemList.length)
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = itemList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(itemList.length / itemsPerPage);

    const handlePageClick = (event) => {
      //errorDelete=null
      const newOffset = (event.selected * itemsPerPage) % itemList.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        
          <Items currentItems={currentItems} />
      
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination mt-4"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <div className="container mt-6 max-w-screen-xl">
   <Toast/>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <>
          <Row className="">
            <Col lg={6} md={12} className="">
              <div className="single-image flex justify-center ">
             
             { product ? (
                !product.thumbnail || product.thumbnail.includes('http') ? (
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="bg-[#bbf7d0] h-[250px] object-cover"
                  />
                ) : (
                  <ImageView imagePath={product.thumbnail} imageName={product.title} model={'product'} id={product._id} classProp={"bg-[#bbf7d0] h-[250px] object-cover"}/>                         
                )
              ) : null
            }
                
              </div>
            </Col>

            <Col lg={6} md={12} className="">
              <div className="product-dt1">
                <div className="product-info">
                  <div className="product-name text-2xl font-bold font-serif mb-2">
                    {product?.title}
                  </div>
                  <p className="text-left my-4"> {product?.description}</p>

                  <div className="product-count col-lg-7 rounded-full">
                    <div className="flex justify-between items-center border p-3">
                      <h6>Price</h6>
                      <span>${product?.price}</span>
                    </div>
                    <div className="flex justify-between items-center border p-3">
                      <h6>Status</h6>
                      {product?.stock > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center border p-3">
                      <h6 className="">Reviews</h6>
                      <Rating
                        value={product?.ratingsAverage}
                        text={`${product?.ratingsQuantity} reviews`}
                      />
                    </div>
                    {product?.stock > 0 ? (
                      <>
                        <div className="flex justify-between items-center  border p-3">
                          <h6>Quantity</h6>
                          <div className="flex gap-2 items-center">
                            <button
                              className="text-[#16a34a] font-bold text-xl"
                              onClick={increaseProduct}
                            >
                              +
                            </button>
                            <input
                              type="text"
                              name="quantity"
                              className="text-center w-[40px] rounded-xl outline-none"
                              min={1}
                              max={product?.stock}
                              value={quantity}
                              readOnly
                            ></input>

                            <button
                              className="text-[#b91c1c] font-bold text-xl"
                              onClick={decreaseProduct}
                            >
                              -
                            </button>
                          </div>
                          <button
                            className=" border px-3 py-2 bg-dark text-white rounded-full"
                            onClick={addToCartHandler}
                          >
                            Add to cart
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className=" font-semibold text-2xl mt-6">Related products</div>
          <div className=" mt-4 flex gap-2">
            {relatedProducts.map((product) => (
              <div
                className=" p-2 rounded-lg border-2 border-solid"
                key={product?._id}
              >
                <Link to={`/product/${product?._id}`} className=" w-fit">
                {
                  product ? (
                    !product.thumbnail || product.thumbnail.includes('http') ? (<img
                      src={product?.thumbnail}
                      alt={product?.title}
                      className="bg-[#bbf7d0]  h-[150px] object-cover"
                      />
                    ) : (
                      <ImageView imagePath={product.thumbnail} imageName={product.title} model={'product'} id={product._id} classProp={"bg-[#bbf7d0]  h-[150px] object-cover"}/>                         
                    )
                  ) : null
                 
                 
                }
                 
                  <div className="w-fit">
                    <p className="font-serif">{product?.title}</p>
                    <Rating
                      value={product?.ratingsAverage}
                      text={`${product?.ratingsQuantity} reviews`}
                    ></Rating>
                    <h3 className="text-2xl font-bold">${product?.price}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Row className=" my-5">
            <Col className="">
              <h6 className="mb-3 font-bold ">REVIEWS</h6>
              {
                loadingReviewList ? (<Loading/>) : errorReviewList 
                ? (
                  <Message variant="info" className="mt-3">
                    {errorReviewList}
                  </Message>
                ) : (
                  reviews.length >=0 ? (
                    <PaginatedItems  itemsPerPage={1} itemList={reviews}/>
                    
                  ) : (
                    <Message variant="info" className="mt-3">
                      No Reviews
                    </Message>
                  )
                )
              }
              
             
            </Col>

            <Col className="">
              <h6 className="font-bold ">WRITE A CUSTOMER REVIEW</h6>
              <div className="my-4"></div>
              {
                userLogin.userInfo && userLogin.userInfo._id ? 
                  
                    loadingReviewCreate ? (<Loading/>) :
                    errorReviewCreate ? (  
                      <Message variant="danger" className="mt-3">
                      
                        {errorReviewCreate}
                      </Message>) : (
                        <form>
                          <div className="my-4">
                            <strong>Rating</strong>
                            <select className="col-12 bg-[#fafafa] p-3 mt-2 rounded-full" 
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}>
                              
                              <option value={1}>1 - Poor</option>
                              <option value={2}>2 - Fair</option>
                              <option value={3}>3 - Good</option>
                              <option value={4}>4 - Very Good</option>
                              <option value={5}>5 - Excellent</option>
                            </select>
                          </div>
                          <div className="my-4">
                            <strong>Comment</strong>
                            <textarea
                              rows="3"
                              className="col-12 bg-[#fafafa] p-3 mt-2 rounded-lg"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="my-3">
                            <button className="col-2 bg-[#09090b] p-3 rounded-full text-white" type="submit" onClick={(e)=> submitHandler(e)}>
                              SUBMIT
                            </button>
                          </div>
                        </form>
                      )
                  
                 
                 : (
                  <div className="my-3">
                    <Message variant="warning">
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>
                      to write a review{" "}
                    </Message>
                  </div>
                )
              }
             

              
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetail;

/*<select value={quantity}
    onChange={(e) => setQuantity(e.target.value)}>
    {[...Array(product.stock).keys()].map(
        (x) => (
            <option key = {x+1} value = {x+1}>
                {x+1}
            </option>
        )
    )}
</select>*/
