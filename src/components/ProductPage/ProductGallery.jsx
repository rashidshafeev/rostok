import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImg from "../../assets/images/no-image.png";
import "./ProductGallery.css";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { useWindowSize } from "react-use";
import arrow from '../../assets/icons/next-icon.svg';

function ProductGallery({ files, tags }) {
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [lightBoxIndex, setLightBoxIndex] = useState(-1);
  const { width } = useWindowSize();
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderVideo = (item) => {
    return (
      <div className="video-wrapper min-h-[480px] lg:max-h-[480px] cursor-pointer flex items-center"
        onClick={() => setLightBoxIndex(item.index)}>
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
      <div className="flex flex-col justify-center">
        {tags?.length > 0 && <div className="absolute top-5 left-5 flex gap-2">
          {tags?.map((tag) => (
            <div
              key={tag.id}
              style={{ color: tag.text_color }}
              className={`bg-[${tag.background_color}] pb-[10px] pt-3 lg:py-1 px-1.5 lg:px-2 uppercase lg:text-xs font-medium lg:font-bold rounded-xl`}
            >
              <span>{tag.text}</span>
            </div>
          ))}
        </div>}
        <img
          onClick={() => setLightBoxIndex(item.index)}
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
console.log("images");
console.log(images);
  const CustomPrevArrow = ({ onClick }) => (
    <button 
      className='z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute top-1/2 -translate-y-1/2 -left-5 flex justify-center items-center' 
      onClick={onClick}
    > 
      <img className='rotate-180' src={arrow} alt="" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button 
      className='z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute top-1/2 -translate-y-1/2 -right-5 flex justify-center items-center' 
      onClick={onClick}
    > 
      <img src={arrow} alt="" />
    </button>
  );

  const mainSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    asNavFor: thumbnailSliderRef.current,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, images.length),
    centerMode: true,

    // slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: false,
    arrows: false,
    asNavFor: mainSliderRef.current,
    width: '100%',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(4, images.length),
        }
      }
    ]
  };

  return (
    <div className="product-gallery-wrapper">
      <div className="gallery-container">
        <div className="main-slider-container relative">
          <Slider ref={mainSliderRef} {...mainSettings}>
            {images.map((item, index) => (
              <div key={index}>
                {item.type === 'video' ? renderVideo(item) : renderImage(item)}
              </div>
            ))}
          </Slider>
        </div>
        
        {images.length > 1 && (
          <div className="thumbnail-slider-container">
            <Slider ref={thumbnailSliderRef} {...thumbnailSettings}>
              {images.map((item, index) => (
                <div key={index} className="thumbnail-slide">
                  <div className="thumbnail-item">
                    <img 
                      src={item.thumbnail === 'video/mp4' ? noImg : item.thumbnail} 
                      alt="" 
                      className="thumbnail-image"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

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
    </div>
  );
}

export default ProductGallery;
