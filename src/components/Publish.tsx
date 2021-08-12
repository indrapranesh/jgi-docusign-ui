import { Form, Input, Button, notification } from 'antd';
import { API_URL, BASE_URL } from '../constants/url.constants';
import { APIService } from '../helpers/ApiService';

const Publish = ({closeModal}) => {
  const onFinish = async(values: any) => {
    console.log('Success:', values);
    await APIService.patch(BASE_URL, API_URL.UPDATE_VERSION, values);
    notification.success({
        message: 'Map Version Updated'
    });
    closeModal();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="p-3">
        <p className="text-center text-2xl font-bold pb-5">Update Map Version</p>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="Version"
            name="version"
            rules={[{ required: true, message: 'Please input version!' }]}
        >
            <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Update Version
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default Publish;