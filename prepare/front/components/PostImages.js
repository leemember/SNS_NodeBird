import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

const PostImages = ({ images }) => { 
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    //이미지 0개인 경우에는 왜 조건문이 없냐면
    //PostImages.js 에서
    //cover={post.Images[0] && <PostImages images={post.Images} />} 이렇게 배열로 1개 이상으로 설정 했기 때문이다.
    
    //이미지 한개일 때
    if (images.length === 1) {
        return (
            <>
              <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
            </>
            // 이미지를 클릭할 수 있게하면 장애인들이 헷갈려한다. 그래서 role 프레젠테이션을 넣어줘야한다.
        )
    }

    //두개일 때
    if (images.length === 2) {
        return (
            <>
              <img role="presentation" style={{width:'50%', display:'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
              <img role="presentation" style={{width:'50%', display:'inline-block'}} src={images[1].src} alt={images[1].src} onClick={onZoom} />
            </>
            // 이미지를 클릭할 수 있게하면 장애인들이 헷갈려한다. 그래서 role 프레젠테이션을 넣어줘야한다.
        )
    }

    //3개 일 때
    return (
      <>
        <div>
          <img role="presentation" style={{width:'50%'}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
          <div 
            role="presentation"
            style={{ display: 'inline-block', width:'50%', textAlign:'center', verticalAlign :'middle'}}
            onClick={onZoom}
          >

          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더 보기
        </div>
       </div>
      </>
       
    )
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;