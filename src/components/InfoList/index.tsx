import React from 'react';
import style from './index.less';

export interface InfoListProps {
  data: { label: any; value: any }[];
}

const InfoList: React.FC<InfoListProps> = ({ data }) => {
  return (
    <div className={style.main}>
      {data.map((item) => {
        return (
          <div key={item.label} className={`${style.item} flex`}>
            <span className={style.label}>{item.label}:</span>
            <span className={style.value}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoList;
