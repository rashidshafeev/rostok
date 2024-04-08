import React, { useRef } from 'react'

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import LeftNav from './Gallery/LeftNav';
import RightNav from './Gallery/RightNav';

import Slider from "react-slick";

function ProductGallery({ files }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    console.log(files)
    const images = []
    const imageGalleryRef = useRef(null);

    const onClickHandler = () => {
      console.log("clicked");
      imageGalleryRef.current.toggleFullscreen();
    };

    


    const renderVideo = (item) => {
        return (
          <div className="video-wrapper">
            <iframe
              className='rounded-lg'
              width="100%"
              height="480px"
              src={item.embedUrl}
              frameBorder="0"
              allowFullScreen
              title="ex"
            />
          </div>
        );
      };
     
      const renderImage = (item) => {
        return (
          <div  className="h-[480px] flex flex-col justify-center">
            <img onClick={onClickHandler} src={item.original} className="shrink object-contain rounded-xl" alt="" />
          </div>
        );
      };


      
    
    files?.forEach((file) => {
        if (file.type === "image") {
      
          images.push({
            original: file.large,
            thumbnail: file.small,
            renderItem: renderImage.bind(this),
          })
      
        } else if (file.type === "video") {
      
          images.push({
            embedUrl: file.url,
            thumbnail: 'video/mp4',
            renderItem: renderVideo.bind(this),
            originalHeight: "480px",
          })
      
        }
      
      })

      

console.log("images")
console.log(images)

  return (
    <>
    <ImageGallery
              renderLeftNav={(onClick, disabled) => (<LeftNav onClick={onClick} disabled={disabled} />)}
              renderRightNav={(onClick, disabled) => (<RightNav onClick={onClick} disabled={disabled} />)}
              items={images} showVideo={true} additionalClass="" showFullscreenButton={false} showPlayButton={false} 
              ref={imageGalleryRef}/>

              {/* <Slider {...settings}>
              <div className='bg-red w-10'>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider> */}
            </>
  )
}

export default ProductGallery