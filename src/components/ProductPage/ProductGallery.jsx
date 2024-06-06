import React, { useRef, useState } from 'react'

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import LeftNav from './Gallery/LeftNav';
import RightNav from './Gallery/RightNav';
import noImg from '../../assets/images/no-image.png'
import './ProductGallery.css'

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

function ProductGallery({ files }) {

  console.log("files", files, files?.length);
  // const images = []
  const imageGalleryRef = useRef(null);
  const sliderIndex = useRef(0)
  const [lightBoxIndex, setLightBoxIndex] = useState(-1);


  const renderVideo = (item) => {
    return (
      <div className="video-wrapper min-h-[480px] max-h-[480px]  cursor-pointer flex items-center"
      onClick={() => {
        setLightBoxIndex(item.index)
        sliderIndex.current = item.index
      }}
      >
        <video
          className='rounded-lg cursor-pointer'
          width="100%"
          height="480px"
          src={item.embedUrl}
          autoplay={true}
          controls
        >
          {/* <source
    src={item.embedUrl}
    type="video/mp4" /> */}
        Your browser doesn't support HTML5 video tag.
        </video>

        {/* <iframe
          onClick={() => {
            console.log(1)
            setLightBoxIndex(item.index)
          }}
          className='rounded-lg cursor-pointer'
          width="100%"
          height="480px"
          src={item.embedUrl}
          frameBorder="0"
          // allowFullScreen
          title="ex"
        /> */}
      </div>
    );
  };

  const renderImage = (item) => {
    return (

      <div className="flex flex-col  justify-center">

        <img
          onClick={() => {
            setLightBoxIndex(item.index)
            sliderIndex.current = item.index
          }}
          src={item.original}
          className="shrink min-h-[480px] max-h-[480px]  object-scale-down rounded-xl" alt="" />
      </div>
    );
  };


  const images = []

  files?.length ? files?.forEach((file, index) => {
    if (file.type === "image") {

      images.push({
        //for lightbox
        index: index,
        src: file.large,
        //for react-image-gallery
        original: file.large,
        thumbnail: file.small,
        renderItem: renderImage.bind(this),
        
      })

    } else if (file.type === "video") {

      images.push({
        //for lightbox
        index: index,
        type: "video",
        width: 1280,
        height: 720,
        sources: [
          {
            src: file.url,
            type: "video/mp4",
          }
        ],
        //for react-image-gallery
        embedUrl: file.url,
        thumbnail: 'video/mp4',
        renderItem: renderVideo.bind(this),
        originalHeight: "480px",
      })

    }

  }) : images.push({
    original: noImg,
    thumbnail: noImg,
    renderItem: renderImage.bind(this),
  })



  //   const images = files?.length ? files.map((file) => {
  //     if (file.type === "image") {
  //         return {
  //             original: file.large,
  //             thumbnail: file.small,
  //             renderItem: renderImage.bind(this),
  //         };
  //     } else if (file.type === "video") {
  //         return {
  //             embedUrl: file.url,
  //             thumbnail: 'video/mp4',
  //             renderItem: renderVideo.bind(this),
  //             originalHeight: "480px",
  //         };
  //     }
  //     return null;
  // }) : [{
  //     original: noImg,
  //     thumbnail: noImg,
  //     renderItem: renderImage.bind(this),
  // }];




  return (
    <>
      <ImageGallery
        renderLeftNav={(onClick, disabled) => (<LeftNav onClick={onClick} disabled={disabled} />)}
        renderRightNav={(onClick, disabled) => (<RightNav onClick={onClick} disabled={disabled} />)}
        items={images} showVideo={true} additionalClass="" showFullscreenButton={false} showPlayButton={false} useBrowserFullscreen={false}
        startIndex={sliderIndex.current}
        ref={imageGalleryRef}
      />
      <Lightbox
      plugins={[  Video   ]}
        index={lightBoxIndex}
        slides={images}
        open={lightBoxIndex >= 0}
        close={() => setLightBoxIndex(-1)}
        controller={{
          closeOnBackdropClick: true
        }}
        on={{
          exited: () => {goToIndex(sliderIndex.current)  }
        }}
      />
    </>
  )
}

export default ProductGallery