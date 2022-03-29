import React from 'react'
import axios from 'axios'
import { SLIDER_DELETE_FAIL, SLIDER_DELETE_REQUEST, SLIDER_DELETE_SUCCESS, SLIDER_LIST_FAIL, SLIDER_LIST_REQUEST, SLIDER_LIST_SUCCESS } from '../Constants/SliderConstants';
import { logout } from './userActions';

export const ListSlider = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_LIST_REQUEST});
        const { data } = await axios.get(
            `/api/slider`
        )
        dispatch({ type: SLIDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: SLIDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }


}

export const deleteSlider = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDER_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/slider/${id}`, config);
  
      dispatch({ type: SLIDER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SLIDER_DELETE_FAIL,
        payload: message,
      });
    }
  };
