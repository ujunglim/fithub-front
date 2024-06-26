import React from 'react';
import { Link } from 'react-router-dom';
import { LinkButtonProps } from '../../types/common';

// URL을 bg로 갖는 Btn 컴포넌트
const LinkBtnWithUrl: React.FunctionComponent<LinkButtonProps> = ({
  bg,
  to,
  children,
  onClick,
}) => {
  return (
    <Link
      to={to}
      style={{ backgroundImage: `url(${bg})` }}
      className="bg flex h-full w-full items-center justify-center rounded-xl bg-cover bg-center text-2xl font-extrabold text-white  xl:text-3xl"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkBtnWithUrl;
