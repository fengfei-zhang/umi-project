/*
 * @Author: zhangfengfei
 * @Date: 2021-12-07 16:58:40
 * @LastEditTime: 2021-12-24 10:17:09
 * @LastEditors: zhangfengfei
 */
import { getDeviceService, getStatisticsService } from '@/services/devices';
import useModal from '@/hooks/useModal';
import { formatRequestPageParams } from '@/utils/handleUseRequest';
import { formateListResult } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import DevicesFilter from './components/DevicesFilter';
import ImportDropDown from './components/ImportDropDown';
import DeviceStatistics from './DeviceStatistics';
import DeviceTable from './DeviceTable';

interface AccessCenterProps {}

const AccessCenter: FC<AccessCenterProps> = () => {
  const [filterParams, setFilterParams] = useState({});
  const deviceDrawer = useModal();

  const { tableProps, refresh } = useRequest(
    (params) => getDeviceService({ ...formatRequestPageParams(params), ...filterParams }),
    {
      initialData: { total: 0, list: [] },
      formatResult: (res) => formateListResult(res, 'devices'),
      paginated: true,
      refreshDeps: [filterParams],
    },
  );

  const handleFilterChange = (values: any) => {
    setFilterParams(values);
  };

  return (
    <div>
      <DeviceStatistics />
      <Row className="margin-bottom-middle" justify="space-between">
        <Col>
          <DevicesFilter onChange={handleFilterChange} />
        </Col>
        <Col>
          <Button
            className="margin-right-little"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              deviceDrawer.setTypeWithVisible('add');
            }}
          >
            添加
          </Button>
          <ImportDropDown refresh={refresh} />
        </Col>
      </Row>
      <DeviceTable deviceDrawer={deviceDrawer} tableProps={tableProps} refresh={refresh} />
    </div>
  );
};

export default AccessCenter;
