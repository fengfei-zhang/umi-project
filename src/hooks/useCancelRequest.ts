import { useEffect } from 'react';

export default function useCancelRequest(cancelMapArr: any[]) {
  useEffect(() => {
    return () => {
      cancelMapArr.forEach((cancelMap) => {
        if (cancelMap) {
          Object.keys(cancelMap).forEach((i) => {
            try {
              if (cancelMap[i] && cancelMap[i].cancel) {
                cancelMap[i].cancel();
              }
            } catch (error) {
              console.warn(error);
            }
          });
        }
      });
    };
  }, []);

  function cancelRequest(requestId?: string) {
    cancelMapArr.forEach((cancelMap) => {
      if (requestId && cancelMap[requestId]) {
        cancelMap[requestId].cancel();
      }
      // else {
      //   cancelMap &&
      //     Object.keys(cancelMap).forEach((i) => {
      //       cancelMap[i].cancel();
      //     });
      // }
    });
  }
  return { cancelRequest };
}
