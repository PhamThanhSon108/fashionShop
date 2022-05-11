import React from 'react'
import axios from 'axios'
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from '../Constants/CategoryConstants';

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
