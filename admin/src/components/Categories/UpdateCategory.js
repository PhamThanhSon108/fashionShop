import React, { useEffect, useState } from 'react'
import Toast from "../LoadingError/Toast";
import Loading from '../LoadingError/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCurrentCategory } from '../../Redux/Actions/categoryActions';

const UpdateCategory = ({currentCategory}) => {
  const dispatch = useDispatch()
  const [name,setName] = useState('')
  const [idCategory,setIdCategory] = useState('')
  const [image,setImage] = useState('')
  const [description,setDescription] = useState('');
  const lcategories = useSelector((state) => state.CategoryList)
  const { categories } = lcategories
  const handleCreateCategory = () => {
    dispatch(UpdateCurrentCategory(idCategory,name,image,description))
}
useEffect(()=>{
    setIdCategory(categories[currentCategory]?._id)
    setName(categories[currentCategory]?.name)
    setImage(categories[currentCategory]?.image)
    setDescription(categories[currentCategory]?.description)
},[currentCategory])
  return (
    <>
    <div className="col-md-12 col-lg-4">
      <form>
        {/* {} <Loading />} */}
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
          <button className="btn btn-primary py-3" onClick={handleCreateCategory}>Update Category</button>
        </div>
      </form>
    </div>
    </>
  );
};
export default UpdateCategory

