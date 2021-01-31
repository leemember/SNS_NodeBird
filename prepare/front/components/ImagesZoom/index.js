import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {Overlay, Global, CloseBtn, ImgWrapper, Indicator, SlickWrapper, Header} from './styles';


// 여기서 props에 담긴 images가 undefined가 뜬다면 부모가 잘못된 것이니 props를 잘 봐주면 된다.
const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide ] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>

      <SlickWrapper>
        {/* 
          initialSlide={0} 몇번째 슬라이드부터 시작 할 것인지. 첫번째니까 0 
          afterChange={(slide) => setCurrentSlide(slide)} 이건 현재 슬라이더인지!
          infinite 무한반복 
          arrows={false} 화살표 사라지게
          slidesToShow={1} 한 번 넘길 떄 1개만 보이게
          slidesToScroll={1} 1개만 넘길 수 있게
        */}
        <div>
          <Slick 
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
        {/* {currentSlide + 1} 현재 몇번째중에서 몇번째 슬라이더를 보고 있는지*/}
      </SlickWrapper>
    </Overlay>
  );
}

ImagesZoom.propTypes = {
  images:PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose:PropTypes.func.isRequired,
}

export default ImagesZoom;