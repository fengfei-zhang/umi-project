// 外部依赖包
import React, { useState } from 'react';
// 内部依赖包
import { Input, Form } from 'antd';
import { letterAndNumberValidator } from '@/utils/validate';
import { Rule } from 'antd/lib/form';

export interface PasswordProps {
  name: string;
  type?: string;
  checkPassword?: boolean;
  passwordLabel?: string;
  confirmLabel?: string;
  rules?: Rule[];
  placeholder?: string;
  confirmPlaceholder?: string;
  validateLetterAndNumber?: boolean;
  validateCharacter?: boolean;
  required?: boolean;
}

const Password: React.FC<PasswordProps> = ({
  type = 'password',
  checkPassword,
  confirmLabel = '新密码',
  passwordLabel = '密码',
  name,
  placeholder,
  confirmPlaceholder = '请再次输入',
  validateLetterAndNumber = true,
  validateCharacter = true,
  required = true,
  rules = [],
}) => {
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = useState(false);

  const nowType = show ? 'text' : type;
  const suffix = <a onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</a>;

  const newRules: Rule[] = [{ required, message: `${passwordLabel}是必填项` }, ...rules];

  if (validateCharacter) {
    newRules.push({
      type: 'string',
      min: 8,
      max: 20,
      message: '介于8到20个字符',
    });
  }

  if (validateLetterAndNumber) {
    newRules.push(letterAndNumberValidator());
  }

  return (
    <>
      <Form.Item name={name} label={passwordLabel} rules={newRules}>
        <Input
          autoComplete="new-password"
          onChange={(val) => {
            setPassword(val.target.value);
          }}
          type={nowType}
          suffix={suffix}
          placeholder={placeholder}
        />
      </Form.Item>
      {checkPassword && (
        <Form.Item
          name="confirm"
          label={confirmLabel}
          dependencies={[name]}
          rules={[
            { required: true, message: `请再次输入${passwordLabel}` },
            {
              validator: (rule, value) => {
                if (!value || password === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次输入的密码不一致');
              },
            },
          ]}
        >
          <Input
            autoComplete="new-password"
            type={nowType}
            placeholder={`${confirmPlaceholder}${passwordLabel}`}
          />
        </Form.Item>
      )}
    </>
  );
};

export default Password;
