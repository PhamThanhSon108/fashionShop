import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ListSlider } from '../Redux/Actions/sliderAction';
export default function Silder() {

  // const slider = [
  //   "https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi",
  //   "https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi",
  //   "https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi",
  //   "https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi",
  //   "https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi"
  // ]
  const sliderList = useSelector((state)=>state.sliderLoad)
  const {slider} = sliderList
  const dispatch = useDispatch()
  const [sliderCurrent, setSliderCurrent] = useState(0)
  
  const handleNext = ()=>{
    if(sliderCurrent <= -(slider.length-1)*900) {setSliderCurrent(0)}
    else {
      setSliderCurrent(sliderCurrent-900)
    }
  }
  const handlePre = ()=>{
    if(sliderCurrent >= 0) {setSliderCurrent(-(slider.length-1)*900)}
    else {
      setSliderCurrent(sliderCurrent+900)
    }
  }
  useEffect(() => {
    dispatch(ListSlider())
    // console.log(slider,1)
    }, [])
    return (
      <div className='Announcement'>

        <div class="container ">
          <div class="row slider-row">
            <div className='slider-wrap'>
              <div className='slider'>
              <i onClick={handleNext} className="slider-btn__next fal fa-angle-right"></i>
              <i onClick={handlePre} className="slider-btn__pre fal fa-angle-left"></i>
                <ul class="slider-list" style={{'transform':`translateX(${sliderCurrent}px)`}}>
                  {
                  
                    slider.map((value, index) => (
                      <li className='slider-item'>
                        <img className='slider-img' alt={index} src={value.url} />
                      </li>
                    ))
                  
                  }
                  {/* <li className='slider-item'>
                <img src='https://cf.shopee.vn/file/88ba643244f50aba0dc3d5f85e16ea40_xxhdpi' />
              </li> */}

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}
