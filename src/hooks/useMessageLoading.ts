import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';

export interface Result {
  setLoading: (show: boolean) => void;
}

export interface Options {
  msg: string;
  manual: boolean;
  key?: string;
}

/**
 * 通过request loading 展示常用的信息提示（常用于操作动作）
 * @param loading
 * @param msg
 */
function useMessageLoading(loading: boolean, options: Partial<Options> = {}): Result {
  const { manual, msg = '请求中...', key } = options;
  const [count, setCount] = useState(0);
  const messageLoading = useRef<any>();

  useEffect(() => {
    if (manual) {
      return;
    }
    if (loading) {
      setCount(count + 1);
      messageLoading.current = message.loading({ content: msg, key }, 0);
    } else if (messageLoading.current) {
      messageLoading.current();
    }
  }, [loading]);

  function setLoading(show: boolean) {
    if (show) {
      setCount(count + 1);
      messageLoading.current = message.loading({ content: msg, key }, 0);
    } else if (messageLoading.current) {
      messageLoading.current();
    }
  }

  return { setLoading };
}

export default useMessageLoading;
