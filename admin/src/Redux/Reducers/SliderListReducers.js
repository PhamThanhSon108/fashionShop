import { SLIDER_CREATE_FAIL, SLIDER_DELETE_FAIL, SLIDER_DELETE_REQUEST, SLIDER_DELETE_SUCCESS, SLIDER_LIST_FAIL, SLIDER_LIST_REQUEST, SLIDER_LIST_SUCCESS } from "../Constants/SliderConstants";

export const sliderListReducer = (state = { slider: [] }, action) => {
    switch (action.type) {
      case SLIDER_LIST_REQUEST:
        return { loading: true, slider: [] };
      case SLIDER_LIST_SUCCESS:
        return {
          loading: false,
          slider: action.payload,
        };
      case SLIDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const sliderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SLIDER_DELETE_REQUEST:
        return { loading: true, success: false };
      case SLIDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SLIDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
