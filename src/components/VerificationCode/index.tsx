import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface VerificationCodeProps {
  url: string;
  style?: any;
  className?: string;
  onClick?: () => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ className, url, style, onClick }) => {
  const [timestampe, setTimestampe] = useState(+new Date());

  useEffect(() => {}, [timestampe]);

  return (
    <img
      className={`${className} ${styles.main}`}
      onClick={() => {
        setTimestampe(+new Date());
        if (onClick) onClick();
      }}
      src={`${url}`}
      alt=""
      style={{ height: 32, width: 92, ...style }}
    />
  );
};

export default VerificationCode;
