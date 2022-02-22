/*
 * @Author: zhangfengfei
 * @Date: 2021-12-16 14:16:29
 * @LastEditTime: 2021-12-24 10:35:57
 * @LastEditors: zhangfengfei
 */
import { baseUrl, deviceImportApi, deviceUpdateApi } from '@/api';
import InfoItem from '@/components/InfoItem';
import { ModalState } from '@/hooks/useModal';
import cookie from '@/utils/cookie';
import { FolderAddFilled } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message, Modal, Result, Table, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'umi';
import styles from './index.less';

const { Dragger } = Upload;

interface ImportModalProps extends ModalState {
  refresh: () => Promise<any>;
}

const ImportModal: FC<ImportModalProps> = ({ visible, setVisible, type, refresh }) => {
  const dispatch = useDispatch();
  const [contain, setContain] = useState<'upload' | 'table' | 'info'>('upload');
  const [errorData, setErrorData] = useState<string[]>([]);
  const [successData, setSuccessData] = useState<{ success_num: number }>();

  const onClose = () => {
    setVisible(false);
  };

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    if (file && file.name.indexOf('.xls') === -1) {
      message.warning('文件格式不正确');
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (!visible) {
      setContain('upload');
    }
  }, [visible]);

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success('导入成功');
      setContain('info');
      setSuccessData(info.file.response.data);
      refresh();
      dispatch({
        type: 'global/getStatistics',
      });
    } else if (status === 'error') {
      message.error('导入失败');
      setErrorData(info.file.response.data.error);
      setContain('table');
    }
  };

  return (
    <Modal
      title="批量导入"
      width={800}
      visible={visible}
      onCancel={onClose}
      maskClosable={contain === 'upload'}
      destroyOnClose
      footer={
        contain === 'upload' ? (
          <Button onClick={onClose}>取消</Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setContain('upload');
              onClose();
            }}
          >
            确定
          </Button>
        )
      }
    >
      {contain === 'upload' && (
        <Dragger
          className={styles.dragger}
          style={{ height: 500 }}
          name="xlsx"
          accept=".xls,.xlsx"
          maxCount={1}
          showUploadList={false}
          headers={{ Authorization: `Bearer ${cookie.getCookie('token')}` }}
          beforeUpload={beforeUpload}
          onChange={onChange}
          action={`${baseUrl}${type === 'update' ? deviceUpdateApi : deviceImportApi}`}
          // data={(file) => (file.originFileObj)}
        >
          <p className="ant-upload-drag-icon margin-top-middle">
            <FolderAddFilled />
          </p>
          <p className="ant-upload-text margin-bottom-little">
            请点击上传文件，或将*.xls,*.xlsx文件拖入此区域
          </p>
          <p className="ant-upload-hint margin-bottom-middle">
            单个文件的设备导入数量需小于500
            <br />
            字段不符合规则，整条数据不予导入
          </p>
          {/* <Button
          className="margin-bottom-middle"
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            onUpload();
          }}
        >
          上传文件
        </Button> */}
        </Dragger>
      )}

      {contain === 'table' && (
        <>
          <InfoItem key="序号" colon={false} label="序号" value="错误信息" />
          <div style={{ height: 360, overflowY: 'auto' }}>
            {errorData.map((item, index) => (
              <InfoItem
                key={index.toString()}
                colon={false}
                label={index.toString()}
                value={item}
              />
            ))}
          </div>
        </>
      )}
      {contain === 'info' && (
        <Result
          className="flex flex-v flex-pack-center h-100"
          style={{ height: 400 }}
          status="success"
          title="导入完成"
          extra={
            <span>
              新增设备: <span style={{ color: '#ff8800' }}>{successData?.success_num || 0}</span> 台
            </span>
          }
        />
      )}
    </Modal>
  );
};

export default ImportModal;
