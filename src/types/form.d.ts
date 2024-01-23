import React from 'react';
import { Gender } from './user';

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface IFormErrorProps {
  children: React.ReactNode;
}

export interface IErrorTextProps {
  text: string;
}

export interface IHelperLinkProps {
  to: string;
  content: string;
}

export interface ILabelProps {
  htmlFor: string;
  text: string;
  children?: React.ReactNode;
}

export interface ILogoProps {
  width?: string;
  fontSize?: string;
}

export interface IFormSubmitButtonProps {
  text: string;
  className?: string;
}

export interface ISocialButtonProps {
  to: string;
  alt: string;
  src: string;
  className?: string;
}

export interface ILoginFormValue {
  email: string;
  password: string;
}

export interface ILoginFormError {
  [key: string]: string;
  email: string;
  password?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  gender?: Gender;
}

export interface ISignupFormError {
  [key: string]: string;
  email: string;
  password: string;
  checkPassword: string;
  name: string;
  nickname: string;
  phone: string;
}

export interface IInputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (id: string, value: string) => void;
  error: ILoginFormError;
  disabled?: boolean;
}
