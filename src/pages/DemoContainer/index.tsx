import { PageContainer, FooterToolbar } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <div>
    <PageContainer
    // footer={[
    //   <Button key="1" type="primary">
    //     提交
    //   </Button>,
    // ]}
    >
      <div style={{ width: 100, height: 1000, backgroundColor: 'red' }}></div>
      <FooterToolbar
        style={{
          left: 208,
          width: `calc(100% - 208px)`,
        }}
      >
        <Button>提交</Button>
      </FooterToolbar>
    </PageContainer>
  </div>
);
