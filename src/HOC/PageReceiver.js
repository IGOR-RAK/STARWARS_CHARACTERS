import { Col, Row } from "antd";
import Header from "../components/Header";

export default function PageReceiver({ children }) {
  return (
    <Row justify="center" align="middle">
      <Col span={16}>
        <Header />
        {children}
      </Col>
    </Row>
  );
}
