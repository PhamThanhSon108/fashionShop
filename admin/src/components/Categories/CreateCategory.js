import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { addCategory } from "../../Redux/Actions/categoryActions";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";



const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const [name,setName] = useState('')
  const [image,setImage] = useState('')
  const [description,setDescription] = useState('')

  const dispatch = useDispatch();

  const cCategory = useSelector((state) => state.CategoryAdd);
  const { loading, error, success} = cCategory;
   
  useEffect(() => {
      if (success) {
        toast.success("Category Added", ToastObjects);
      }
      if(error) {
        toast.error(error, ToastObjects);
      }
    }, [success, error]);
  const handleCreateCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(name, image, description))
}
  return (
    <>
    <Toast />
    <div className="col-md-12 col-lg-4">
      <form>
        {loading && <Loading />}
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Image
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            value={image}
            onChange={(e)=>{
              setImage(e.target.value)
            }}
          />
        </div>
        {/* <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" />
        </div> */}
        {/* <form method="POST" action="api/upload-profile-pic" enctype="multipart/form-data">
          <div>
            <label>Select your profile picture:</label>
            <input type="file" name="profile_pic" />
          </div>
          <div>
            <input type="submit" name="btn_upload_profile_pic" value="Upload" />
          </div>
        </form> */}
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e)=>{
            setDescription(e.target.value)
            }}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3" onClick={handleCreateCategory}>Create category</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateCategory;
