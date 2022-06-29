import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { IComment } from '../entities';
import { useAddCommentMutation, useEditCommentMutation } from '../commentsApi';

interface CommentsFormProps {
  initialValues?: Partial<IComment>;
}

export const CommentsForm = (props: CommentsFormProps): ReactElement => {
  const [form] = Form.useForm();

  const [addComment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();

  const [initialValues, setInitialValues] = useState<Partial<IComment>>();

  useEffect(() => {
    if (props.initialValues) {
      setInitialValues(props.initialValues);
    }
  }, [form, props.initialValues])

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const onFinish = (values: any) => {
    if (initialValues?.id) {
      editComment({...initialValues, ...values});
    } else {
      addComment({...initialValues, ...values});
    }

    setInitialValues(undefined);
    form.resetFields(['email', 'comment']);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const {TextArea} = Input;

  return (
    <Form
      labelCol={{span: 4}}
      wrapperCol={{span: 18}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{required: true, message: 'Please input your email!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Comment"
        name="comment"
        rules={[{required: true, message: 'Please input your comment!'}]}
      >
        <TextArea rows={4}/>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
