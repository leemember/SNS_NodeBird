import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

//화면을 꽉 채우려면 위아래양옆을 전 부 0으로 해줘야 화면이 꽉 찬다.
export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  rigth: 0;
  bottom:0;
`;

export const Header = styled.header`
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
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right:0;
  top:0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
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

// 이건 기존 라이브러리에 구축되어있던 스타일들을 바꿔주려 할 때 쓰는 문법이다.
// 그럼 알아서 덮어진다. 그리고 이 Global태그를 return안에 아무곳에 넣어주면 된다.
export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }

  .ant-card-cover {
    transform: none !important;
  }
`;
