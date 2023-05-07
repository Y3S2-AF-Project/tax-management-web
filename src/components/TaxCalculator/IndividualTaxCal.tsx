import React from "react";
import { Button, Checkbox, Form, Input, InputNumber, Col, Row, Card } from "antd";
import {TaxCalForm} from "./TaxCalForm";
import TaxCalDisplay from "./TaxCalDisplay";

const IndividualTaxCal: React.FC = () => (
  <Card
  title="Tax Calculator for Indiviudals"
  extra={<a href="#">Tax Policy</a>}
  style={{ width: '90%' }}
  >
  <Row gutter={32}>
    <Col span={12}>
      <TaxCalForm/>
    </Col>
    <Col span={12}>
      <TaxCalDisplay/>
    </Col>
  </Row>
  </Card>
);

export default IndividualTaxCal;
