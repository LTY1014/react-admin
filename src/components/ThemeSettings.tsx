import React from 'react';
import { Card, Switch, Space, ColorPicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPrimaryColor, toggleDarkMode } from '../store/slices/themeSlice';

/**
 * 主题设置组件
 * @constructor
 */
const ThemeSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { primaryColor, isDarkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Card title="主题设置">
      <Space direction="vertical">
        <div>
          <span style={{ marginRight: 8 }}>暗黑模式：</span>
          <Switch
            checked={isDarkMode}
            onChange={() => dispatch(toggleDarkMode())}
          />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>主题色：</span>
          <ColorPicker
            value={primaryColor}
            onChange={(color) => dispatch(setPrimaryColor(color.toHexString()))}
          />
        </div>
      </Space>
    </Card>
  );
};

export default ThemeSettings; 