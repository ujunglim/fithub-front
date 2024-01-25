import React, { useState } from 'react';

interface ImageSliderProps {
  postImages: string[];
  imageSize?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  postImages,
  imageSize = '468',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < postImages.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  const isShowBBtn = postImages.length > 1 && currentIndex > 0;

  const isShowNBtn =
    postImages.length > 1 && currentIndex < postImages.length - 1;

  let bBtnOpacity = 'opacity-80';

  let nBtnOpacity = 'opacity-80';

  if (!isShowBBtn) {
    bBtnOpacity = 'opacity-0 cursor-auto';
  }
  if (!isShowNBtn) {
    nBtnOpacity = 'opacity-0 cursor-auto';
  }

  return (
    <div className="flex items-center  justify-center bg-yellow-500">
      <button type="button" onClick={handlePrevClick}>
        <span
          className={`material-symbols-outlined relative  z-10 -mr-14 rounded-full bg-white  ${bBtnOpacity}`}
        >
          navigate_before
        </span>
      </button>
      <div className="flex max-h-[500px] w-full overflow-hidden bg-black lg:aspect-auto lg:h-[400px]">
        <div
          className="flex w-full items-center bg-slate-400   transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {postImages.map((imageUrl, index) => (
            <img
              key={imageUrl as string}
              src={imageUrl as string}
              alt={`게시물 이미지 ${index + 1}`}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleNextClick}
        className="z-20 bg-slate-500"
      >
        <span
          className={`material-symbols-outlined relative z-20 -ml-14 rounded-full bg-white p-0.5 ${nBtnOpacity}`}
        >
          navigate_next
        </span>
      </button>
    </div>
  );
};

export default ImageSlider;
