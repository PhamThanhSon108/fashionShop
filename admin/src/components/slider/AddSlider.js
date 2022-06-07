import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createSlider, ListSlider } from "../../Redux/Actions/SliderAction";
import { SLIDER_CREATE_RESET } from "../../Redux/Constants/SliderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export default function AddSlider() {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading, error, slider } = sliderCreate;
  useEffect(() => {
    if (slider) {
      toast.success("Slider Added", ToastObjects);
      dispatch({ type: SLIDER_CREATE_RESET });
      setUrl("");
    }
    dispatch(ListSlider());
  }, [dispatch, slider]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSlider(url));
  };
  return (
    <>
      <Toast />
      <form onSubmit={submitHandler} style={{ maxWidth: "1000px" }}>
        <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-8 shadow-sm ">
              <div className="card-body">
                <div className="mb-8 d-flex">
                  <label htmlFor="product_title" className="form-label">
                    URL BANNER
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_title"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ minWidth: 100 }}
                  >
                    ADD
                  </button>
                </div>
                <div></div>
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
