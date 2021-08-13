import { Form, Input, Button, notification } from 'antd';
import { API_URL, BASE_URL } from '../constants/url.constants';
import { APIService } from '../helpers/ApiService';

const AddStakeHolder = ({closeModal}) => {
  const onFinish = async(values: any) => {
    console.log('Success:', values);
    await APIService.post(BASE_URL, API_URL.CREATE_USER, values);
    notification.success({
      message: 'New Stakeholder added to the group.'
    });
    closeModal()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="p-3">
        <p className="text-center text-2xl font-bold pb-5">Add a new Stakeholder</p>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, {type: 'email'}]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Create User
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default AddStakeHolder;