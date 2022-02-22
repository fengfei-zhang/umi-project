/*
 * @Author: zhangfengfei
 * @Date: 2021-11-22 17:35:39
 * @LastEditTime: 2021-12-23 19:55:20
 * @LastEditors: zhangfengfei
 */
import React, { useImperativeHandle } from 'react';
import type { ModalType } from '@/hooks/useModal';
import { Cascader, FormInstance, message } from 'antd';
import { Button, Col, Collapse, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import type { DeviceItem } from '@/services/devices';
import { verifyDeviceService } from '@/services/devices';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import ModeSelector from './ModeSelector';
import { CaretRightOutlined } from '@ant-design/icons';
import {
  floatDigitValidator,
  ipValidator,
  mobileValidator,
  NumLetterValidator,
  stringLengthValidator,
} from '@/utils/validate';
import {
  arrayToTree,
  enumToOptions,
  isReqSuccess,
  paramsTransToNum,
  removeEmpty,
  translateMultiSelectValue,
} from '@/utils/utils';
import {
  BracketDirectionType,
  CoordinateSystemType,
  DeviceBrandType,
  DeviceFunctionType,
  DeviceType,
  FillInLightType,
  IndustryType,
  ISPType,
  MonitorDirectionType,
  NetworkType,
  PicProtocolType,
  PointType,
  PoleType,
  VideoProtocolType,
} from '@/pages/data';
import { useRequest } from 'ahooks';
import FormItemGroup from '@/components/FormItemGroup';
import { isUndefined } from 'lodash';
import { FieldData } from 'rc-field-form/lib/interface';
import { DivisionData } from '@/services/global';

const { TextArea } = Input;
const { Panel } = Collapse;
interface DeviceFormProps {
  form: FormInstance<any>;
  type: ModalType;
  currentItem?: DeviceItem;
  divisions: DivisionData[];
  ref: any;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    offset: 1,
  },
};
const verifyArr = ['device_ip', 'video_ctrl_port', 'video_protocol', 'username', 'password'];
export const deviceNumArr = [
  'video_ctrl_port',
  'pic_ctrl_port',
  'box_num',
  'bracket_length',
  'pole_height',
];

const initValues = {
  pic_enable: false,
};

const DeviceForm: FC<DeviceFormProps> = React.forwardRef(
  ({ form, type, currentItem, divisions }, ref) => {
    const divisionOptions = removeEmpty(arrayToTree(divisions));
    // 切换快速接入和完整接入
    const [mode, setMode] = useState<'part' | 'all'>('part');
    // 图片推送开关
    const [picEnable, setPicEnable] = useState(false);
    // 视频接入协议
    const [protocol, setProtocol] = useState<VideoProtocolType>();

    // 探测地址请求
    const verifyDeviceReq = useRequest(verifyDeviceService, {
      manual: true,
      onSuccess: (res) => {
        if (isReqSuccess(res)) {
          const { major_stream_url, minor_stream_url } = res.data.data;
          if (!major_stream_url || !minor_stream_url) {
            message.error('探测失败');
          } else {
            message.success('探测成功');
            const { data } = res.data;
            // 探测成功则赋值
            form.setFieldsValue(data);
          }
        }
      },
      onError: () => {
        message.error('探测失败');
      },
    });

    const onSelect = (value: 'part' | 'all') => {
      setMode(value);
    };
    const onPicSwitch = (value: boolean) => {
      setPicEnable(value);
    };
    const onProtocolChange = (value: VideoProtocolType) => {
      setProtocol(value);
    };
    // 探测地址
    const onVerify = async () => {
      try {
        const values = paramsTransToNum(await form.validateFields(verifyArr), deviceNumArr);
        verifyDeviceReq.run({ ...values, port: values.video_ctrl_port });
      } catch (error) {
        console.log('Failed:', error);
      }
    };
    // 表单变化值联动
    const onFieldsChange = (changedFields: FieldData[]) => {
      const { name, value } = changedFields[0];
      if (name[0] === 'civil_name') {
        // civil_name联动civil_code
        const newValue = value as any[];
        const civil = divisions.find((item) => item.code === newValue[newValue.length - 1]);
        form.setFieldsValue({ civil_code: civil?.code });
      }
    };
    // 行政区划输入值筛选
    const onFilter = (inputValue: string, path: any[]) => {
      return path.some(
        (option) =>
          `${option.label}${option.value}`.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      );
    };

    // 导入需要用到
    useImperativeHandle(ref, () => ({
      setProtocol,
      setPicEnable,
    }));

    // 添加重置  编辑赋值
    useEffect(() => {
      if (type === 'add') {
        form.resetFields();
      } else if (type === 'update' && currentItem) {
        // 行政区划特殊处理
        const selectedItem = divisions.find((item) => item.name === currentItem.civil_name);
        form.setFieldsValue({
          ...currentItem,
          pole_height: String(currentItem.pole_height) || '',
          bracket_length: String(currentItem.bracket_length) || '',
          civil_name: translateMultiSelectValue(divisions, selectedItem?.code || ''),
        });
      }
      // 兼容导入和切换值
      setProtocol(form.getFieldValue('video_protocol'));
      setPicEnable(form.getFieldValue('pic_enable'));
    }, [type, currentItem, form, divisions]);

    // 添加时视频端口默认值
    useEffect(() => {
      if (type === 'add' && !isUndefined(protocol)) {
        const portInitValues = {
          [VideoProtocolType.ONVIF]: 80,
          // [VideoProtocolType.海康]: 8000,
          // [VideoProtocolType.大华]: 37777,
        };
        form.setFieldsValue({ video_ctrl_port: portInitValues[protocol] });
      }
    }, [form, protocol, type]);

    return (
      <Form
        form={form}
        labelAlign="right"
        autoComplete="off"
        initialValues={initValues}
        onFieldsChange={onFieldsChange}
        scrollToFirstError
        {...formItemLayout}
      >
        <ModeSelector mode={mode} onSelect={onSelect} />
        <Collapse
          ghost
          defaultActiveKey={['1', '2', '3']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined style={{ color: '#2BBFC7' }} rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header="设备接入" key="1">
            <Form.Item
              label="设备IP"
              name="device_ip"
              rules={[{ required: true, message: '请输入' }, ipValidator()]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入' }]}>
              <Input.Password placeholder="请输入" />
            </Form.Item>
          </Panel>
          <Panel header="视频接入" key="2">
            <Form.Item
              label="接入协议"
              name="video_protocol"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Select
                placeholder="请输入"
                options={enumToOptions(VideoProtocolType)}
                onChange={onProtocolChange}
              />
            </Form.Item>
            {protocol !== VideoProtocolType.RTSP && (
              <Form.Item label="端口" required>
                <Row justify="space-between">
                  <Col flex={1} className="margin-right-middle">
                    <Form.Item
                      name="video_ctrl_port"
                      style={{ margin: 0 }}
                      rules={[{ required: true, message: '请输入' }]}
                    >
                      <Input min={1} placeholder="请输入" type="number" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      loading={verifyDeviceReq.loading}
                      disabled={protocol !== VideoProtocolType.ONVIF}
                      onClick={onVerify}
                    >
                      探测流地址
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            )}

            {(protocol === VideoProtocolType.ONVIF || protocol === VideoProtocolType.RTSP) && (
              <>
                <Form.Item
                  label="主码流地址"
                  name="major_stream_url"
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <TextArea
                    disabled={type === 'add' && protocol === VideoProtocolType.ONVIF}
                    placeholder="请输入"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
                <Form.Item
                  label="子码流地址"
                  name="minor_stream_url"
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <TextArea
                    disabled={type === 'add' && protocol === VideoProtocolType.ONVIF}
                    placeholder="请输入"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </>
            )}
          </Panel>
          <Panel header="图片接入" key="3">
            <Form.Item label="图片推送" name="pic_enable" valuePropName="checked">
              <Switch defaultChecked={false} onChange={onPicSwitch} />
            </Form.Item>
            {picEnable && (
              <>
                <Form.Item label="接入协议" name="pic_protocol">
                  <Select placeholder="请输入" options={enumToOptions(PicProtocolType)} />
                </Form.Item>
                <Form.Item label="端口" name="pic_ctrl_port">
                  <Input placeholder="请输入" type="number" />
                </Form.Item>
              </>
            )}
          </Panel>
          <Panel header="设备属性信息" key="4">
            <Form.Item
              label="设备名称"
              name="device_name"
              rules={[stringLengthValidator(false, 100)]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="SN编码"
              name="sn"
              rules={[NumLetterValidator(undefined, '-'), stringLengthValidator(false, 20)]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            {mode === 'all' && (
              <>
                <Form.Item label="设备品牌" name="device_brand">
                  <Select placeholder="请输入" options={enumToOptions(DeviceBrandType)} />
                </Form.Item>
                <Form.Item
                  label="设备型号"
                  name="device_model"
                  rules={[NumLetterValidator(undefined, '-'), stringLengthValidator(false, 30)]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="摄像机类型" name="device_type">
                  <Select placeholder="请输入" options={enumToOptions(DeviceType)} />
                </Form.Item>
                <Form.Item label="摄像机功能" name="device_function_array">
                  <FormItemGroup type="Checkbox" enumValue={DeviceFunctionType} />
                </Form.Item>
                <Form.Item label="监视方向" name="monitor_direction">
                  <Select placeholder="请输入" options={enumToOptions(MonitorDirectionType)} />
                </Form.Item>
                <Form.Item label="补光灯" name="fill_in_light">
                  <FormItemGroup type="Radio" enumValue={FillInLightType} />
                </Form.Item>
              </>
            )}
          </Panel>
          {mode === 'all' && (
            <Panel header="点位属性信息" key="5">
              <Form.Item
                label="点位名称"
                name="location"
                rules={[stringLengthValidator(false, 100)]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="行政区划">
                <Row justify="space-between">
                  <Col span={12}>
                    <Form.Item name="civil_name" style={{ margin: 0 }}>
                      <Cascader
                        placeholder="请选择"
                        options={divisionOptions}
                        showSearch={{ filter: onFilter }}
                        changeOnSelect
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label="行政编码" style={{ margin: 0 }} name="civil_code">
                      <Input disabled placeholder="请输入" type="number" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="坐标系" name="coordinate_system">
                <FormItemGroup type="Radio" enumValue={CoordinateSystemType} />
              </Form.Item>
              <Form.Item label="经度" name="longitude" rules={[floatDigitValidator(6)]}>
                <InputNumber
                  placeholder="请输入"
                  min={0}
                  style={{ width: '100%' }}
                  stringMode
                  step="0.000001"
                />
              </Form.Item>
              <Form.Item label="纬度" name="latitude" rules={[floatDigitValidator(6)]}>
                <InputNumber
                  placeholder="请输入"
                  style={{ width: '100%' }}
                  min={0}
                  stringMode
                  step="0.000001"
                />
              </Form.Item>
              <Form.Item label="监控点类型" name="point_type">
                <Select placeholder="请输入" options={enumToOptions(PointType)} />
              </Form.Item>
              <Form.Item
                label="采集区域"
                name="collect_area"
                rules={[NumLetterValidator(), stringLengthValidator(false, 5)]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="所属行业" name="industry">
                <Select placeholder="请输入" options={enumToOptions(IndustryType)} />
              </Form.Item>
              <Form.Item label="网络类型" name="network_type">
                <FormItemGroup type="Radio" enumValue={NetworkType} />
              </Form.Item>
              <Form.Item label="网络运营商" name="isp">
                <Select placeholder="请输入" options={enumToOptions(ISPType)} />
              </Form.Item>
              <Form.Item
                label="安装联系人"
                name="contact_name"
                rules={[stringLengthValidator(false, 10)]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="联系人电话" name="contact_number" rules={[mobileValidator()]}>
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="立杆类型" name="pole_type">
                <FormItemGroup type="Radio" enumValue={PoleType} />
              </Form.Item>
              <Form.Item label="立杆高度" name="pole_height" rules={[floatDigitValidator(2)]}>
                <InputNumber
                  placeholder="请输入"
                  stringMode
                  addonAfter="米"
                  step="0.01"
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item label="支臂方向" name="bracket_direction">
                <FormItemGroup type="Radio" enumValue={BracketDirectionType} />
              </Form.Item>
              <Form.Item label="支臂长度" name="bracket_length" rules={[floatDigitValidator(2)]}>
                <InputNumber
                  stringMode
                  step="0.01"
                  addonAfter="米"
                  min={0}
                  placeholder="请输入"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item label="箱体数量" name="box_num">
                <InputNumber placeholder="请输入" min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="箱体编号" name="box_id" rules={[stringLengthValidator(false, 10)]}>
                <Input placeholder="请输入" style={{ width: '100%' }} />
              </Form.Item>
            </Panel>
          )}
        </Collapse>
      </Form>
    );
  },
);

export default DeviceForm;
