import React, {useCallback, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { addPost } from '../reducers/post';

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    // 실제 돔에 접근하기 위해서 Ref를 쓴다.
    const imageInput = useRef();
    const [text, setText] = useState('');
    const onChangeText = useCallback((e)=> {
        setText(e.target.value);
    }, []);

    //짹짹 버튼을 눌렀을 때 게시물일 달리게끔 하는 기능이다. post리듀서에 있는 addPost를 디스패치 시켜주면 된다.
    // 그리고 dispatch 자리에는 원래 객체가 들어가는 것이 맞다.
    const onSubmit = useCallback(()=> {
        dispatch(addPost);
        setText(''); // 짹쨱 눌렀을 때 남겨진 텍스트 없애주기.
    }, []);

    // 이렇게 하면 이미지업로드 버튼을 누르면 사진을 띄울 수가 있다.
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        //인라인 스타일로 하면 리렌더링이 되는데 처음에는 인스타일로 해도 된다. 딱히 성능에 문제 없음. 문제가 생길시에 최적화 하면된다.
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"            
            />

            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType="submit">짹짹</Button>
            </div>
            
            {/* 컴포넌트로 나누면 좋은 것중 하나가 이렇게 map으로 반복 배열문으로 사용하는 문법을 쓸 때 좋다. */}
            {/* 이미지를 업로드 했을 때 imagePaths를 통해 반복문을 돌려 표시해준다. */}
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block'}}>
                        <img src={v} style={{ width : '200px' }} alt={v} />
                    </div>
                ))}
            </div>
        </Form>
    )
};

export default PostForm;