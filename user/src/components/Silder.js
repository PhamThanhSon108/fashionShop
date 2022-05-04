import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ListSlider } from '../Redux/Actions/sliderAction';
export default function Silder() {
  
  const sliderList = useSelector((state)=>state.sliderLoad)
  const {slider} = sliderList
  const dispatch = useDispatch()
  // const [sliderCurrent, setSliderCurrent] = useState(0)
  const [currentIndex,setCurrentIndex] = useState(1)
<<<<<<< HEAD
  useEffect(() => {
    dispatch(ListSlider())
    }, []) 
  useEffect(() => {
    const interval = setInterval(() => {
      if(currentIndex < slider.length-1) {
        setCurrentIndex((currentIndex)=>currentIndex+1)
      } 
        else{
          setCurrentIndex(0)
        }
    }, 4000);
=======

 
  // const handleNext = ()=>{
  //   if(sliderCurrent <= -(slider.length-1)*900) {setSliderCurrent(0)}
  //   else {
  //     setSliderCurrent(sliderCurrent-900)
  //   }
  // }
  // const handlePre = ()=>{
  //   if(sliderCurrent >= 0) {setSliderCurrent(-(slider.length-1)*900)}
  //   else {
  //     setSliderCurrent(sliderCurrent+900)
  //   }
  // }
  useEffect(() => {
    dispatch(ListSlider())
    }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      if(currentIndex < slider.length-1) {
        setCurrentIndex((currentIndex)=>currentIndex+1)} 
        else{
          setCurrentIndex(0)
        }
    }, 2000);
>>>>>>> 5b3f8fba44e25a4f08be43058432bb504f98abb4
    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleIndexNext = () => {
    if(currentIndex < slider.length-1) {
<<<<<<< HEAD
    setCurrentIndex((currentIndex)=>currentIndex+1)
    } 
=======
    setCurrentIndex((currentIndex)=>currentIndex+1)} 
>>>>>>> 5b3f8fba44e25a4f08be43058432bb504f98abb4
    else{
      setCurrentIndex(0)
    }
  }

  const handleIndexPre = () => {
    if(currentIndex>0) {
<<<<<<< HEAD
    setCurrentIndex((currentIndex)=>currentIndex-1)
    }
=======
    setCurrentIndex((currentIndex)=>currentIndex-1)}
>>>>>>> 5b3f8fba44e25a4f08be43058432bb504f98abb4
    else {
      setCurrentIndex(slider.length-1)
    }
  }

    return (
      <div className='Announcement'>

        <div class="container ">
          <div class="row slider-row">
            <div className='slider-wrap'>
              <div className='slider'>
<<<<<<< HEAD
=======
              {/* <i onClick={handleNext} className="slider-btn__next fal fa-angle-right"></i>
              <i onClick={handlePre} className="slider-btn__pre fal fa-angle-left"></i> */}

>>>>>>> 5b3f8fba44e25a4f08be43058432bb504f98abb4
              <i onClick={handleIndexNext} className="slider-btn__next fal fa-angle-right"></i>
              <i onClick={handleIndexPre} className="slider-btn__pre fal fa-angle-left"></i>
                <ul class="slider-list" 
                // style={{'transform':`translateX(${sliderCurrent}px)`}}
                >
<<<<<<< HEAD
                <li className='slider-item'>
                    <img className='slider-item-img' src={slider[0]!=undefined?slider[currentIndex].url:'https://cf.shopee.vn/file/88ba643244f50aba0d_xxhdpi'} />
                </li>
=======
                  {
                  
                    // slider.map((value, index) => (
                    //   <li className='slider-item'>
                    //     <img className='slider-img' alt={index} src={value.url} />
                    //   </li>
                    // ))
                  
                  }
                  <li className='slider-item'>
                <img className='slider-item-img' src={slider[0]!=undefined?slider[currentIndex].url:'https://cf.shopee.vn/file/88ba643244f50aba0d_xxhdpi'} />
              </li>
>>>>>>> 5b3f8fba44e25a4f08be43058432bb504f98abb4

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}
