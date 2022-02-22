import React from 'react';
import { Table as AntdTable, Pagination } from 'antd';
import { TableProps } from 'antd/lib/table/index.d';
import isEmpty from 'lodash/isEmpty';
import styles from './index.less';

/**
 * 带有动态数据 pagination 的table组件
 */
export interface TableComponentProps extends TableProps<any> {
  customPaination?: boolean;
  theme?: 'dark' | 'light';
}

const Table: React.FC<TableComponentProps> = ({
  theme,
  customPaination = true,
  pagination,
  className = 'tc',
  ...tableProps
}) => {
  const antdTableProps: any = {
    ...tableProps,
  };

  if (customPaination) {
    antdTableProps.pagination = false;
  } else {
    antdTableProps.pagination = pagination;
  }

  return (
    <div className={`${theme && styles[theme]} ${tableProps.scroll && styles['fixed-table']}`}>
      <AntdTable size="small" {...antdTableProps} />
      {!isEmpty(tableProps.dataSource) && pagination && customPaination && (
        <Pagination
          className={`margin-top-middle ${className}`}
          showSizeChanger
          showQuickJumper
          {...pagination}
        />
      )}
    </div>
  );
};

export default Table;
