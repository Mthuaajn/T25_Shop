import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      setCategoryName("");
      alert("Category added!");
    }
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryName));
  };
  const getErrorMessage = (errorCategory) => {
    return errorCategory.response && errorCategory.response.data.message
      ? errorCategory.response.data.message
      : errorCategory.message;
  };

  return (
    <div className="flex flex-column">
      <div>
        <Link to="/admin/categories">
          <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3 ">
            Return category list
          </button>
        </Link>
      </div>
      <div className="flex flex-row justify-center font-bold text-2xl">
        ADD CATEGORY
      </div>
      <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
        <form onSubmit={submitHandler}>
          <div className="form mb-4 text-left input-group">
            <span
              className="text-start font-bold input-group-text w-30"
              for="typeEmailX-2"
            >
              Category name
            </span>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-row justify-center my-2 p-3 text-xl">
            <button type="submit" className="">
              <p className="bg-[#10b981] px-4 py-2 rounded-lg text-white">
                <FontAwesomeIcon icon={faSave} color="white" />
                <span> Save</span>
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
