/*
 * @Author: zhangfengfei
 * @Date: 2021-12-21 15:26:46
 * @LastEditTime: 2021-12-21 15:35:57
 * @LastEditors: zhangfengfei
 */
import useModal from '@/hooks/useModal';
import { exportDeviceService, exportDeviceTemplateService } from '@/services/devices';
import { downloadBlobFile } from '@/utils/utils';
import { CaretUpOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Dropdown, Menu } from 'antd';
import React, { FC, useState } from 'react';
import ImportModal from '../ImportModal';
import styles from './index.less';

interface ImportDropDownProps {
  refresh: () => Promise<any>;
}

const ImportDropDown: FC<ImportDropDownProps> = ({ refresh }) => {
  const importModal = useModal();
  const [isActive, setIsActive] = useState(false);

  const exportDeviceReq = useRequest(exportDeviceService, {
    manual: true,
    formatResult: (res) => {
      if (res.status === 200) {
        downloadBlobFile(res.data, '设备列表', 'xlsx');
      }
    },
  });
  const exportDeviceTemplateReq = useRequest(exportDeviceTemplateService, {
    manual: true,
    formatResult: (res) => {
      if (res.status === 200) {
        downloadBlobFile(res.data, '新增模板', 'xlsx');
      }
    },
  });

  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <a
          type="text"
          onClick={() => {
            exportDeviceReq.run();
          }}
        >
          批量导出
        </a>
      </Menu.Item>
      <Menu.Item key={1}>
        <a
          type="text"
          onClick={() => {
            exportDeviceTemplateReq.run();
          }}
        >
          导出新增模板
        </a>
      </Menu.Item>
      <Menu.Item key={2}>
        <a
          type="text"
          onClick={() => {
            importModal.setTypeWithVisible('add');
          }}
        >
          批量导入新增
        </a>
      </Menu.Item>
      <Menu.Item key={3}>
        <a
          type="text"
          onClick={() => {
            importModal.setTypeWithVisible('update');
          }}
        >
          批量导入更新
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown
        overlayClassName={styles.import}
        overlay={menu}
        placement="bottomLeft"
        onVisibleChange={(visible) => {
          setIsActive(visible);
        }}
      >
        <Button type="primary">
          批量操作 <CaretUpOutlined rotate={isActive ? 180 : 0} />
        </Button>
      </Dropdown>
      <ImportModal {...importModal} refresh={refresh} />
    </>
  );
};

export default ImportDropDown;
