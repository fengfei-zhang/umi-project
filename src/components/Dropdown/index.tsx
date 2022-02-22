import React, { useMemo, useState, CSSProperties, useEffect, ReactNode, ReactElement } from 'react';
import { Dropdown as AntdDropdown, Menu, Row, Col, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { filterDropDownNameBykey } from '@/utils/utils';

import styles from './index.less';

export interface DropDownPropsItem {
  label: string;
  value: string;
  icon?: ReactElement;
}

export interface DropDownProps {
  data: DropDownPropsItem[];
  onClick: (values: any) => void;
  defaultActiveKey?: string | any;
  titleStyle?: CSSProperties;
  titleClassName?: string;
  title?: string | any;
  showDownIcon?: boolean;
  disabled?: boolean;
  value?: any;
  showTitleIcon?: boolean;
  titleIconClassName?: string;
}

/**
 * 通用下拉组件
 * @param param0
 */
const Dropdown: React.FC<DropDownProps> = ({
  data = [],
  onClick = () => {},
  defaultActiveKey,
  titleStyle,
  title,
  showDownIcon = true,
  titleClassName,
  disabled,
  value,
  showTitleIcon,
  titleIconClassName,
}) => {
  const [active, setActive] = useState<string>(defaultActiveKey);

  useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  const menu = useMemo(() => {
    return (
      <Menu selectedKeys={[String(active)]}>
        {data.map((item) => {
          const { label, icon } = item;
          return (
            <Menu.Item
              key={item.value}
              onClick={() => {
                onClick(item.value);
                setActive(item.value);
              }}
            >
              <Row justify="center" align="middle">
                {icon && <span className="margin-right-default">{icon}</span>}

                <Tooltip title={label}>
                  <span style={{ display: 'inline-block', width: 100 }} className="text-overflow">
                    {label}
                  </span>
                </Tooltip>
              </Row>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, [data, active]);

  const newTitleStyle: CSSProperties = {
    color: disabled ? 'rgba(255,255,255,0.25)' : '',
    ...titleStyle,
  };

  // 获取activeKey对应的icon
  const TitleIcon = useMemo(() => {
    const activeIcon = data.find((item) => item.value === active);
    return activeIcon?.icon;
  }, [data, active]);

  return (
    <AntdDropdown overlay={menu} overlayClassName={styles.menu} disabled={disabled}>
      <Row align="middle">
        {/* 展示title前的icon */}
        {showTitleIcon && <Col className={titleIconClassName}>{TitleIcon}</Col>}
        <Col style={newTitleStyle} className={`text-overflow ${titleClassName}`}>
          {title || filterDropDownNameBykey(data, active)}
        </Col>
        {showDownIcon && (
          <Col className="margin-left-little">
            <DownOutlined />
          </Col>
        )}
      </Row>
    </AntdDropdown>
  );
};

export default Dropdown;
