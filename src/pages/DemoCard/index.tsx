import { useState } from 'react';
import ProCard, { CheckCard } from '@ant-design/pro-card';
import { Avatar, Form, Button, Space, Select } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import styles from './index.less';
const { Option } = Select;

const Header = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ backgroundColor: '#7265e6' }} icon={<UserOutlined />} size="large" />
      <div style={{ marginLeft: '10px' }}>
        <div>第1行</div>
        <div>第2行</div>
        <div>第3行</div>
        <div>第3行</div>
        <div>第3行</div>
        <div>第3行</div>
        <div>第3行</div>
        <div>第3行</div>
        <div>第3行</div>
      </div>
    </div>
  );
};
const Bottom = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      className={styles.bottom}
    >
      <Space>
        <Button type="primary">按钮1</Button>
        <Button type="primary">按钮2</Button>
        <Button type="primary">按钮3</Button>
      </Space>
    </div>
  );
};
const DemoCard = () => {
  const [form] = Form.useForm();
  const [size, setSize] = useState('default');
  const handleSubmit = async (values: any) => {
    console.log('values', values);
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
    setSize(value);
  }

  return (
    <div className={styles.container}>
      <div>
        <Select defaultValue="default" style={{ width: 120 }} onChange={handleChange}>
          <Option value="default">default</Option>
          <Option value="large">large</Option>
          <Option value="small"> small </Option>
        </Select>
      </div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="checkbox-group" label="技术栈">
          <CheckCard.Group style={{ width: '100%' }} size={size}>
            <CheckCard
              className={styles.checkbox}
              title={<Header />}
              description={<Bottom />}
              value="1"
            />
            <CheckCard title={<Header />} description={<Bottom />} value="2" />
            <CheckCard title={<Header />} description={<Bottom />} value="3" />
          </CheckCard.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DemoCard;
