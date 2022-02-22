import { useState } from 'react';

export interface Config {
  /**
   * 筛选条件
   */
  condition?: (item: any) => boolean;
  /**
   * 筛选字段
   */
  field?: string;
}

/**
 * table selected 通用
 *
 * @export
 * @param {any[]} dataSource
 * @returns
 */
export default function useSelectedTable(dataSource: any[] = [], config: Config = {}) {
  const { condition = () => true, field = '' } = config;
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  function onTableSelectChange(newSelectedRowKeys: any[], newSelectedRows: any[]) {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  }

  function clear() {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  }

  return {
    rowSelection: {
      onChange: onTableSelectChange,
      selectedRowKeys,
      // selections: [
      //   {
      //     key: 'all-data',
      //     text: '选择全部数据',
      //     onSelect: () => {
      //       if (!isEmpty(dataSource) && dataSource) {
      //         const newSelectedRowKeys: string[] = [];
      //         const newSelectedRows: any[] = [];
      //         dataSource.forEach((item: any) => {
      //           if (condition && condition(item)) {
      //             newSelectedRowKeys.push(item[field]);
      //             newSelectedRows.push(item);
      //           }
      //         });
      //         setSelectedRowKeys(newSelectedRowKeys);
      //         setSelectedRows(newSelectedRows);
      //       }
      //     },
      //   },
      //   {
      //     key: 'current-page-data',
      //     text: '选择当前页',
      //     onSelect: (changableRowKeys: any[]) => {
      //       const newSelectedRowKeys: string[] = [];
      //       const newSelectedRows: any[] = [];
      //       if (!isEmpty(dataSource) && dataSource) {
      //         changableRowKeys.forEach((id: any) => {
      //           newSelectedRowKeys.push(id);
      //         });
      //         setSelectedRowKeys(newSelectedRowKeys);

      //         dataSource.forEach(item => {
      //           if (changableRowKeys.includes(item[field])) {
      //             newSelectedRows.push(item);
      //           }
      //         });
      //         setSelectedRows(newSelectedRows);
      //       }
      //     },
      //   },
      // ],
    },
    selectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
    clear,
  };
}
