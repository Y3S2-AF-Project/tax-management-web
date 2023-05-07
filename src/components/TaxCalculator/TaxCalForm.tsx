import React from "react";
import { Button, Form, Input, InputNumber, } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const TaxCalForm: React.FC = () => (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Employment Income"
          name="empIncome"
          rules={[{ required: true, message: "Please input your income!" }]}
        >
          <InputNumber prefix="Rs." style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Investment Income"
          name="investIncome"
          rules={[{ required: true, message: "Please input your income!" }]}
        >
          <InputNumber prefix="Rs." style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Business Income"
          name="businessIncome"
          rules={[{ required: true, message: "Please input your income!" }]}
        >
          <InputNumber prefix="Rs." style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Other Income"
          name="otherIncome"
          rules={[{ required: true, message: "Please input your income!" }]}
        >
          <InputNumber prefix="Rs." style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Total Qualifying Payments"
          name="qualifyPay"
          rules={[{ required: true, message: "Please input your deductions!" }]}
        >
          <InputNumber prefix="Rs." style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>
);

export {TaxCalForm};
