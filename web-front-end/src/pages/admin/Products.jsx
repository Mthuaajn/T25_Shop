/* eslint-disable react/prop-types */
import { faEdit, faEye, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import VerticallyCenteredModal from "../LoadingError/Modal";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProductsAdmin, listProductsAdminSort } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Message"
import ImageView from "../Components/ImageView";
const Products = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [itemPerPage, setItemPerPage] = useState(6)
  const dispatch = useDispatch()
 

  const productList = useSelector((state) => state.productList)

  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete)
  let { error: errorDelete, success: successDelete } = productDelete
  const [filter, setFilter] = useState(1)
  useEffect(() => {
    switch (filter) {
        case 1: 
        dispatch(listProductsAdmin())
        break;
      
        case 3: 
       
        dispatch(listProductsAdminSort(3))
        break;
        case 4: 
        dispatch(listProductsAdminSort(4))
        break;
        default: 
      
        dispatch(listProductsAdmin())
        break;
    }
    
  },[dispatch, successDelete, filter])

  const deleteHandler = (id) => {
      alert(`deleted ${id}`)
     dispatch(deleteProduct(id))
    setModalShow(false)
  }

  const deleteHandler2 = (id) => {
    if (window.confirm(`Are you sure to delete this product ${id}?`)) {
      dispatch(deleteProduct(id))
     // alert(`deleted ${id}`)
    }
  }
    
  
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <div
              key={item._id}
              className="border rounded-md flex flex-col max-w-[250px] px-2 pt-2 pb-0 max-h-[250px]"
            >
              <div className="bg-white rounded-lg mx-auto w-2/3 h-1/2 ">
                { 
                  item ? (
                    !item.thumbnail || item.thumbnail.includes('http') ? (
                      <img src={item.thumbnail} alt={item.title} className="w-4/5 h-4/5"/>
                    ) : (
                      <ImageView imagePath={item.thumbnail} imageName={item.title} model={'product'} id={item._id} classProp={"w-4/5 h-4/5"}/>
                    )
                  ) : null
                  
                }
                
              </div>
              <p>{item.title}</p>
              <div className="flex justify-between">
                <p className="font-semibold">${item.price}</p>
                <div className="flex gap-1">
                  
                    <Link to={`/admin/product/${item._id}`}>
                      <button className="rounded-xl px-3 bg-[#4ade80]">
                        <FontAwesomeIcon icon={faEye} size="xs" /> 
                      </button>
                    </Link>
                    <Link to={`/admin/product/edit/${item._id}`}>
                      <button className="rounded-xl px-3 bg-[#FFBE18]">
                      <FontAwesomeIcon icon={faEdit} size="xs" /> 
                      </button>
                    </Link>
                    
                 
                  <button className="rounded-xl px-3 bg-[#ef4444]" onClick={() => deleteHandler2(item._id)}>         
                      <FontAwesomeIcon icon={faTrash} size="xs" />               
                  </button>
                  <div style={{ display: 'none', position: 'initial' }} >
                  <VerticallyCenteredModal 
                      show={modalShow}
                      onCancel={(e) => setModalShow(false)}
                      onDelete={(e) => deleteHandler(item._id)}
                      header={`Are you sure to delete product ${item.title}?`}
                      body = {`Product stock: ${item.stock}`}
                      />
                      </div>
                </div>
              </div>
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
        <div className="grid grid-cols-3 gap-y-6">
          <Items currentItems={currentItems} />
        </div>
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
    <div className="px-10">
      <div className="flex justify-between mt-3">
        <div className=""></div>
        
          <Link to="/admin/product/add">
            <button className="bg-[#0CA91B] rounded-lg px-4 py-2 text-white">
              Create new <span className="text-lg">+</span>
            </button>
          </Link>
        
      </div>
      <div className="mt-4 flex justify-between ">
        <div className="bg-[#e1e0e0] flex gap-3 items-center rounded-lg px-4 py-2">
          <FontAwesomeIcon icon={faSearch} color="#5D5FEF" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-[#e1e0e0] min-w-[300px] outline-none"
          />
        </div>
        <div className="flex gap-4">
          <select name="" id="" className="rounded-lg bg-[#e1e0e0] px-4" onChange={(e) => { setFilter(Number.parseInt(e.target.value))}}>
            <option value={1}>All category</option>
          
            <option value={3}>Cheap first</option>
            <option value={4}>Most viewed</option>
          </select>
          <select name="" id="" className="rounded-lg bg-[#e1e0e0] px-4" onChange={(e) => setItemPerPage(e.target.value)}>
            <option value={3}>Show 3</option>
            <option value={6} selected>Show 6</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        {
          errorDelete && (
            <Message variant="danger">{errorDelete}</Message>
           )
        }
        {
           loading ? (<Loading/>) : error ? (
            <Message variant="danger">{error}</Message>
           ) : (
            <PaginatedItems itemsPerPage={itemPerPage} itemList={products} />
           )
        }
        
      </div>
    </div>
  );
};

export default Products;
