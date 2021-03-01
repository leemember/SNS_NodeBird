import React, { useCallback, useState } from 'react'; 
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMsg = styled.div`
    color: red;
`;

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me  } = useSelector((state) => state.user);

    //로그인이 성공했다면 회원가입 페이지에서 나가도록 해준다.
    useEffect(() => {
      if (me && me.id) {
        Router.replace('/');
      }
    }, [me && me.id]);
  
    useEffect(() => {
      if (signUpDone) {
        Router.replace('/');
      }
    }, [signUpDone]);
  
    useEffect(() => {
      if (signUpError) {
        alert(signUpError);
      }
    }, [signUpError]);
  

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    //비밀번호 체크    
    //비밀번호가 맞는지 안맞는지 확인
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    

    //약관 동의
    //체크박스를 체크on,체크off 해주는 기능
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, [])

    //위와 같이 비밀번호체크, 약관동의는 중복되는 부분이 달라서 커스텀 훅으로 합쳐주지 못했다.

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
          type: SIGN_UP_REQUEST,
          data: { email, password, nickname },
        });
        //서버쪽으로 잘 넘어가나 콘솔로도 확인하기.
    }, [email, password, passwordCheck, term]);
    // 위에서도 한번 체크했지만 한 번 더 체크해주면 좋다.
    // 서버 쪽에서도 한번 더 체크해주면 좋다.

    return (
        <AppLayout>            
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>

                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
                </div>

                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} required onChange={onChangePassword} />
                </div>

                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
                </div>
                
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        현주 말을 잘 들을 것을 동의합니다.
                    </Checkbox>
                    {termError && <ErrorMsg>약관에 동의하셔야 합니다.</ErrorMsg>}
                </div>  
                {/*termError는 언제 true가 되냐면 제출할 때 */}

                <div style={{margintTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    )
};

export default Signup;