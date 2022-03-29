import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSlider, ListSlider } from '../../Redux/Actions/SliderAction'

export default function Slidermain() {
    const sliderList = useSelector(state => state.sliderList)
    const { slider } = sliderList

    const sliderDelete = useSelector(state => state.deleteSlider)
    const {loadingDelete,successDelete,errorDelete} = sliderDelete

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ListSlider())
        console.log(sliderDelete)
    }, [dispatch,successDelete])
    const handleDeleteSlider = (id) => {
        if (window.confirm("Are you sure??")) {
        dispatch(deleteSlider(id))
    
        }
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Url</th>
                    <th scope="col" className="text-end" style={{ padding: "0 20px" }}>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {slider.map((value, index) => (
                    <tr key={value._id}>
                        <td>
                            <b>Banner {index + 1}</b>
                        </td>
                        <td>{value.url}</td>
                        <td className="d-flex justify-content-end align-item-center">
                            <Link to={`/order/${value._id}`} className="text-success">
                                <i className="fas fa-pen"></i>
                            </Link>
                            <button onClick={()=>handleDeleteSlider(value._id)} className="text-success" style={{ padding: "0 15px", color: "red" }}>
                                <i className="fas fa-trash-alt" style={{ color: "red" }}></i>
                            </button>

                        </td>
                    </tr>
                ))}


            </tbody>
            <div className='btn' style={{ padding: "15px 15px" }}>
                <i className="fas fa-plus " style={{ color: "green", padding: " 15px"}}></i>
                ADD
            </div>
        </table>

    )
}
