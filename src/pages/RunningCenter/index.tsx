/*
 * @Author: zhangfengfei
 * @Date: 2021-12-07 16:59:53
 * @LastEditTime: 2021-12-21 10:43:12
 * @LastEditors: zhangfengfei
 */
import React, { FC, useState } from 'react';
import ModalWithTable from '@/components/ModalWithTable';
import useModal from '@/hooks/useModal';
import { getServiceListService, ServiceItem } from '@/services/services';
import { formatRequestPageParams } from '@/utils/handleUseRequest';
import { formateListResult } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button } from 'antd';
import AddServiceTable from './components/AddServiceTable';
import ServiceTable from './ServiceTable';

interface RunningCenterProps {}

const RunningCenter: FC<RunningCenterProps> = () => {
  const [serviceItem, setServiceItem] = useState<ServiceItem>();
  const [filterParams, setFilterParams] = useState({});
  // 发现服务modal状态
  const addServiceModal = useModal();
  // 删除服务modal状态
  const [deleteVisible, setDeleteVisible] = useState(false);

  // 服务列表
  const { tableProps, refresh } = useRequest(
    (params) => getServiceListService({ ...formatRequestPageParams(params), ...filterParams }),
    {
      formatResult: (res) => formateListResult(res, 'services'),
      paginated: true,
      refreshDeps: [filterParams],
    },
  );

  const handleFilterChange = (values: any) => {
    setFilterParams(values);
  };

  const onDeleteService = (params: ServiceItem) => {
    setDeleteVisible(true);
    setServiceItem(params);
  };

  return (
    <div>
      <div className="margin-bottom-middle flex flex-pack-justify">
        <h2 style={{ fontSize: 18 }}>接入服务监控</h2>
        {/* <ServicesFilter onChange={handleFilterChange} /> */}
        <Button
          className="margin-right-little"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            addServiceModal.setTypeWithVisible('add');
          }}
        >
          发现服务
        </Button>
      </div>

      <ServiceTable {...tableProps} refresh={refresh} />
      <ModalWithTable title="发现服务" {...addServiceModal}>
        <AddServiceTable {...tableProps} refresh={refresh} />
      </ModalWithTable>
    </div>
  );
};

export default RunningCenter;
