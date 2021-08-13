import {
  Form,
  Button,
  Upload,
  notification
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { APIService } from '../helpers/ApiService';
import { API_URL, BASE_URL } from '../constants/url.constants';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Demo = ({auditId, title,  final, loadAudits, closeModal}) => {
  console.log(final)
    const [file, setFile] = useState('')
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }; 

  const fileChange = (file) => {
        const reader: any = new FileReader();
        reader.readAsDataURL(file?.file?.originFileObj);
        reader.onload = () => {
            setFile(reader.result);
        }
        reader.onerror = error => console.log(error);
  }

  const createReview = async() => {
      if(file.length > 0) {
        const body: any = {
            auditId: auditId,
            mapFile: file
        }
        if(final) {
          body.final = true;
        }
        await APIService.post(BASE_URL, API_URL.CREATE_REVIEW, body);
        notification.success({
          message: final ? 'Final Review Created' : 'New Review Cycle Created'
        });
        notification.success({
          message: 'Envelopes Sent'
        })
        closeModal();
        loadAudits();
      }
  }

  return (
    <>
        <div className="flex justify-center">
            <p className="text-xl font-semibold">{title}</p>
        </div>
        <div className="form-wrapper pt-5">
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
            >

            <Form.Item label="Map File">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger onChange={(file)=> fileChange(file)} name="files" accept="application/pdf" multiple={false} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Select or drag the map file to send for the review</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" onClick={createReview}>
                    Create Review
                </Button>
            </Form.Item>
            </Form>
        </div>
    </>
  );
};

export default Demo;
