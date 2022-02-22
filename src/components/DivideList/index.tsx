import { Skeleton } from 'antd';
import { isEmpty } from 'lodash';
import React, { CSSProperties, ReactElement } from 'react';

import styles from './index.module.less';

interface DataState {
  label: string | React.ReactElement;
  value: any;
  isTitle?: boolean;
}

interface ListState {
  icon?: ReactElement;
  key: string;
  data: DataState[];
  onClick?: () => void;
}

interface DivideListProps {
  listData: ListState[];
  title?: string;
  titleBar?: boolean;
  titleStyle?: React.CSSProperties;
  style?: CSSProperties;
  className?: string;
}

const DivideList: React.FC<DivideListProps> = ({
  listData,
  title,
  titleBar,
  titleStyle,
  style,
  className,
}) => {
  return (
    <div className={`${styles.main} ${className || ''}`} style={style}>
      {/* 是否带标题 */}
      {title ? (
        <p className={styles['header-title']}>
          {titleBar ? <i /> : ''}
          <span style={titleStyle}>{title}</span>
        </p>
      ) : (
        ''
      )}
      {isEmpty(listData) ? (
        <Skeleton active />
      ) : (
        <ul>
          {listData.map((item) => (
            <li
              key={item.key}
              onClick={item.onClick}
              style={item.onClick ? { cursor: 'pointer' } : {}}
            >
              {/*  是否为图标 */}
              {item.icon ? <div className={styles.icon}>{item.icon}</div> : ''}
              {item.data.map((list) =>
                list.isTitle ? (
                  <div key={list.value} className={styles.title}>
                    <p className={styles['title-label']}>{list.label}</p>
                    <p className={styles['title-value']} title={list.value}>
                      {list.value}
                    </p>
                  </div>
                ) : (
                  <div key={list.value} className={styles.item}>
                    <p className={styles['item-label']}>{list.label}</p>
                    <p className={styles['item-value']}>{list.value}</p>
                  </div>
                ),
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DivideList;
