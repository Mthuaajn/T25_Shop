import Rating from "../user/Rating";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Message";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import ImageView from "../Components/ImageView";

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useOutletContext();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const searchQuery = window.location.search;
  const currentPage = searchParams.get("page") || "1";

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(api.getAllCategory, api.config);
      if (res.data.status === "success") {
        const data = res.data.data.data;
        setCategories(
          data.map((item) => ({
            id: item._id,
            value: item.name,
            title: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          }))
        );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        searchParams.get("page")
          ? api.getAllProduct + searchQuery + "&limit=8"
          : api.getAllProduct + searchQuery + "?page=1&limit=8",
        api.config
      );
      if (res.data.status === "success") {
        setTotalPage(res.data.totalPages);
        setProducts(res.data.data.data);
      }
    }
    fetchData();
  }, [searchQuery, searchParams]);

  const loading = false;
  const error = false;

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const titleParam = searchParams.get("title[regex]") || "";
  useEffect(() => {
    setTitle(titleParam);
  }, [titleParam, searchParams, setTitle]);

  return (
    <div className="container max-w-screen-xl mt-4">
      <div className="mx-3 px-4 py-3 bg-[#ededed] mb-2 ">
        <div className="pb-4 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-9">Danh mục</p>

            <select
              className="outline-none bg-white px-3 py-2"
              name=""
              id=""
              value={category}
              onChange={(e) =>
                setSearchParams((params) => {
                  if (e.target.value !== "")
                    params.set("category", e.target.value);
                  else params.delete("category");
                  params.set("page", 1);
                  return params;
                })
              }
            >
              <option value="">Tất cả</option>
              {categories.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="mr-2">Sắp xếp theo</p>
          <button
            className={` px-3 py-2 ${
              sort === "" ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() =>
              setSearchParams((params) => {
                params.delete("sort");
                params.set("page", 1);
                return params;
              })
            }
          >
            Liên quan
          </button>
          <button
            className={` px-3 py-2 ${
              sort === "-createdAt" ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "-createdAt");
                params.set("page", 1);
                return params;
              })
            }
          >
            Mới nhất
          </button>
          <button
            className={` px-3 py-2 ${
              sort === "-ratingsQuantity"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "-ratingsQuantity");
                params.set("page", 1);
                return params;
              })
            }
          >
            Bán chạy
          </button>
          <button
            className={` px-3 py-2 ${
              sort === "price" ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "price");
                params.set("page", 1);
                return params;
              })
            }
          >
            Giá: Thấp đến Cao
          </button>
          <button
            className={` px-3 py-2 ${
              sort === "-price" ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() =>
              setSearchParams((params) => {
                params.set("sort", "-price");
                params.set("page", 1);
                return params;
              })
            }
          >
            Giá: Cao đến Thấp
          </button>
        </div>
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
                    <Link
                      to={`/product/${product._id}`}
                      className="hover:text-black shop w-full p-2 rounded-lg border-2 border-solid bg-white"
                      key={product._id}
                    >
                      <div className="border-product">
                        <div className="shopBack">
                        {
                          product ? (
                            !product.thumbnail || product.thumbnail.includes('http') ? (
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="bg-[#bbf7d0] h-[250px] object-cover"
                                />
                              ) : (
                                <ImageView imagePath={product.thumbnail} imageName={product.title} model={'product'} id={product._id} classProp={"bg-[#bbf7d0] h-[250px] object-cover"}/>
                              )
                          ) : null
                          
                        }
                          
                        </div>

                        <div className="shoptext">
                          <div>
                            <div
                              to={`/product/${product._id}`}
                              className="font-serif"
                            >
                              {product.title}
                            </div>
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
                    </Link>
                  ))}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div className=" mt-4">
        <div className="justify-center   flex items-center">
          <button
            disabled={currentPage == 1}
            className={
              currentPage == 1
                ? "rounded-sm bg-gray-200 flex items-center justify-center w-10 h-10"
                : "rounded-sm bg-white flex items-center justify-center w-10 h-10"
            }
            onClick={() => {
              setSearchParams((params) => {
                params.set("page", currentPage - 1);
                return params;
              });
            }}
          >
            &lt;
          </button>
          <div className="mx-3 flex">
            {Array.from(Array(totalPage)).map((item, index) => {
              if (
                index < 2 ||
                (index >= currentPage - 3 && index <= +currentPage + 1) ||
                index >= totalPage - 2 ||
                (index == 2 && index == currentPage - 4) ||
                (index == +currentPage + 2 && index == totalPage - 3)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchParams((params) => {
                        params.set("page", index + 1);
                        return params;
                      });
                    }}
                    disabled={currentPage == index + 1}
                    className={
                      index + 1 == currentPage
                        ? "bg-blue-500 rounded-sm mx-[2px] text-white flex items-center justify-center w-10 h-10"
                        : "rounded-sm mx-[2px] bg-white flex items-center justify-center w-10 h-10"
                    }
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                (index > 2 && index == currentPage - 4) ||
                (index == +currentPage + 2 && index < totalPage - 3)
              ) {
                return (
                  <button
                    key={index}
                    disabled
                    className={
                      "bg-gray-200 rounded-sm mx-[2px] text-white flex items-center justify-center w-10 h-10"
                    }
                  >
                    ...
                  </button>
                );
              } else {
                return;
              }
            })}
          </div>
          <button
            disabled={currentPage == totalPage}
            className={
              currentPage == totalPage
                ? "rounded-sm bg-gray-200 flex items-center justify-center w-10 h-10"
                : "rounded-sm bg-white flex items-center justify-center w-10 h-10"
            }
            onClick={() => {
              setSearchParams((params) => {
                params.set("page", +currentPage + 1);
                return params;
              });
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
