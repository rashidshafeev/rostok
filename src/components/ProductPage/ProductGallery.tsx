import React, { useRef, useState } from "react";

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import noImg from "@assets/images/no-image.png";
import "./ProductGallery.css";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { useWindowSize } from "react-use";
import LeftNav from "./Gallery/LeftNav";
import RightNav from "./Gallery/RightNav";

function ProductGallery({ files, tags }) {
  
  const imageGalleryRef = useRef(null);
  const sliderIndex = useRef(0);
  const [lightBoxIndex, setLightBoxIndex] = useState(-1);

  const {width} = useWindowSize();
  const renderVideo = (item) => {
    return (
      <div
        className="video-wrapper min-h-[480px] lg:max-h-[480px]  cursor-pointer flex items-center"
        onClick={() => {
          setLightBoxIndex(item.index);
          sliderIndex.current = item.index;
        }}
      >
        <video
          className="rounded-lg cursor-pointer"
          width="100%"
          height="480px"
          src={item.embedUrl}
          autoPlay={true}
          controls
        >
          Your browser doesn&apos;t support HTML5 video tag.
        </video>
      </div>
    );
  };

  const renderImage = (item) => {
    return (
      <div className="flex flex-col  justify-center">
       
       {tags?.length > 0 && <div className="absolute top-5 left-5 flex gap-2">
        {tags?.map((tag) => {
          return (
            <div
            key={tag.id}
              style={{ color: tag.text_color }}
              className={`bg-[${tag.background_color}] pb-[10px] pt-3 lg:py-1 px-1.5 lg:px-2 uppercase lg:text-xs font-medium lg:font-bold rounded-xl`}
            >
              <span>
              {tag.text}

              </span>
            </div>
          );
        })}
      </div>}

        <img
          onClick={() => {
            setLightBoxIndex(item.index);
            sliderIndex.current = item.index;
          }}
          src={item.original}
          className="shrink min-h-[480px] lg:max-h-[480px] object-scale-down rounded-xl"
          alt=""
        />
      </div>
    );
  };

  const images = [];

  files?.length
    ? files?.forEach((file, index) => {
        if (file.type === "img") {
          images.push({
            //for lightbox
            index: index,
            src: file.large,
            //for react-image-gallery
            original: file.large,
            thumbnail: file.small,
            renderItem: renderImage.bind(this),
          });
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
              },
            ],
            //for react-image-gallery
            embedUrl: file.url,
            thumbnail: "video/mp4",
            renderItem: renderVideo.bind(this),
            originalHeight: "480px",
          });
        }
      })
    : images.push({
        original: noImg,
        thumbnail: noImg,
        renderItem: renderImage.bind(this),
      });

  return (
    <>
        <ImageGallery
          renderLeftNav={(onClick, disabled) => (
            <LeftNav onClick={onClick} disabled={disabled} />
          )}
          renderRightNav={(onClick, disabled) => (
            <RightNav onClick={onClick} disabled={disabled} />
          )} 

          items={images}
          showThumbnails={images.length > 1}
          showVideo={true}
          showFullscreenButton={false}
          showPlayButton={false}
          // thumbnailPosition={'left'}
          thumbnailPosition={width > 768 ? 'left' : 'bottom'}
          disableThumbnailScroll={false}
          useBrowserFullscreen={false}
          startIndex={sliderIndex.current}
          ref={imageGalleryRef}
          additionalClass="product-gallery"
        > </ImageGallery>
      <Lightbox
        plugins={[Video]}
        index={lightBoxIndex}
        slides={images}
        open={lightBoxIndex >= 0}
        close={() => setLightBoxIndex(-1)}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </>

  );
}

export default ProductGallery;
