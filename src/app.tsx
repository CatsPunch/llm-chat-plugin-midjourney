import { Button, Flex, Input } from 'antd';
import { FC } from 'react';

import { useStore } from './store';

export const App: FC = () => {
  const { rawInput, updateInput, useInitApp, createImagineTask } = useStore();

  useInitApp();

  return (
    <Flex gap={8}>
      <Input
        onChange={(e) => {
          updateInput(e.target.value);
        }}
        placeholder={'请输入提示词'}
        size={'large'}
        value={rawInput}
      />
      <Button onClick={createImagineTask} size={'large'} type={'primary'}>
        生成
      </Button>
    </Flex>
  );
};
