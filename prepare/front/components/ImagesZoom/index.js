import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled from 'styled-components';

//화면을 꽉 채우려면 위아래양옆을 전 부 0으로 해줘야 화면이 꽉 찬다.
const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  rigth: 0;
  bottom:0;
`;

const Header = styled.header`
  height:44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size:17px;
    color: #333;
    line-height: 44px;
  }

  & button {
    position: absolute;
    right:0;
    top:0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

// 여기서 props에 담긴 images가 undefined가 뜬다면 부모가 잘못된 것이니 props를 잘 봐주면 된다.
const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide ] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
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
            afterChange={(slide) => setCurrentSlide(slide)}
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
        </div>
        
      </SlickWrapper>
    </Overlay>
  );
}

ImagesZoom.propTypes = {
  images:PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose:PropTypes.func.isRequired,
}

export default ImagesZoom;