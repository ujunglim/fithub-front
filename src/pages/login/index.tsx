import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/reduxHooks';

import { defaultLogin, getUserInfos } from '../../apis/user';

import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormError from '../../components/form/FormError';
import FormHelperLink from '../../components/form/FormHelperLink';
import SocialLoginButton from '../../components/form/SocialLoginButton';
import SocialLoginHeader from '../../components/form/SocialLoginHeader';
import FormSubmitButton from '../../components/form/FormSubmitButton';

import kakaoBtn from '../../assets/kakao_symbol.png';
import naverBtn from '../../assets/naver_symbol.png';
import googleBtn from '../../assets/google_symbol.png';

import { ILoginFormError, ILoginFormValue } from '../../types/form';

import validateLoginForm from '../../validation/login/loginFormValidation';
import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';
import BottomButtonLayout from '../../components/form/BottomButtonLayout';
import { LOGIN, SET_TRAINER } from '../../redux/slices/userSlice';
import { SET_USER_INFOS } from '../../redux/slices/userInfos';

function Login() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchParams.get('status') === '400 BAD_REQUEST') {
      alert(searchParams.get('message'));
      navigate('/login');
    }
  }, [navigate, searchParams]);

  const kakaoSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/kakao`;
  const naverSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/naver`;
  const googleSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/google`;

  const initFormValue: ILoginFormValue = {
    email: '',
    password: '',
  };

  const initFormError: ILoginFormError = {
    email: '',
    password: '',
  };

  const [formValue, setFormValue] = useState<ILoginFormValue>(initFormValue);
  const [errorMsg, setErrorMsg] = useState<ILoginFormError>(initFormError);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formValue;

    // send to server
    try {
      const response = await defaultLogin(email, password);
      if (response && response.status === 200) {
        dispatch(LOGIN());
        const res = await getUserInfos();
        if (res.status === 200) {
          // dispatch(SET_USER_INFOS({ userInfos: res.data }));
          localStorage.setItem('email', res.data.email as string);
          localStorage.setItem('profileImg', res.data.profileImg as string);
          localStorage.setItem('nickname', res.data.nickname as string);
          const isTrainer = res.data.trainer;
          if (isTrainer) {
            dispatch(SET_TRAINER());
            const trainerNum = isTrainer ? '1' : '2';
            localStorage.setItem('trainer', trainerNum);
          }
        }
        navigate('/');
      }
    } catch (err) {
      const error = err as unknown as AxiosError;
      console.log(error);
      if (error.status === 403) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (error.status === 404) {
        alert('존재하지 않는 회원입니다.');
      } else {
        alert('로그인 도중 문제가 발생하였습니다.');
      }
    }
  };

  const handleChange = (id?: string, value?: string) => {
    if (id) {
      setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
    }
  };

  return (
    <Layout>
      <FormLogo width="w-14" />
      {/* 이메일, 비밀번호 입력 form */}
      <form
        className="flex  w-full max-w-[600px] flex-col gap-6"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* 이메일 */}
        <FormLabel htmlFor="email" text="이메일">
          <FormInput
            id="email"
            type="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            error={errorMsg}
          />
          {errorMsg.email && <FormError>{errorMsg.email}</FormError>}
        </FormLabel>

        {/* 비밀번호 */}
        <FormLabel htmlFor="password" text="비밀번호">
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            error={errorMsg}
          />
          {errorMsg.password && <FormError>{errorMsg.password}</FormError>}
        </FormLabel>

        {/* 회원가입하기 <-> 아이디, 비밀번호 찾기 */}
        <div className="flex flex-row justify-between text-[#575757]">
          <FormHelperLink to="/signup/email" content="이메일로 회원가입하기" />
          <FormHelperLink to="/help/password" content="비밀번호 찾기" />
        </div>

        {/* 소셜로그인 */}
        <SocialLoginHeader />
        <div className="mt-4 flex flex-row justify-center gap-8">
          {/* 카카오 */}
          <SocialLoginButton
            to={kakaoSocialLoginRequestUrl}
            alt="kakao_login_btn"
            src={kakaoBtn}
            className="flex items-center justify-center rounded-full bg-[#FEE500]"
          />
          {/* 네이버 */}
          <SocialLoginButton
            to={naverSocialLoginRequestUrl}
            alt="naver_login_btn"
            src={naverBtn}
          />
          {/* 구글 */}
          <SocialLoginButton
            to={googleSocialLoginRequestUrl}
            alt="google_login_button"
            src={googleBtn}
          />
        </div>
        <FormSubmitButton>로그인</FormSubmitButton>
      </form>
    </Layout>
  );
}

export default Login;
