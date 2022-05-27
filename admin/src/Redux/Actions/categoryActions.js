import React from 'react'
import axios from 'axios'
import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from '../Constants/CategoryConstants';

export const ListCategory = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/category`, config
        )
        dispatch({ type: CATEGORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }


}



export const DeleteCategory = (i) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `/api/category/${i}`, config
        )
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }


}


export const addCategory = (name, image, description) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_ADD_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // const newName = name.trim()
        const { data } = await axios.post(
            `/api/category`,{name, image, description}, config
        )
        dispatch({ type: CATEGORY_ADD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CATEGORY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }


}
