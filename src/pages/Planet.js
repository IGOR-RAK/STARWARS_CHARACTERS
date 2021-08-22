import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Header from "../components/Header";

export default function Planet() {
  const planets = useSelector((s) => s.planets);
  const backPath = useSelector((s) => s.details.path);

  return (
    <Row justify="center" align="middle">
      <Col span={16}>
        <div>
          <Header />
          <div className="flex">
            {planets ? (
              <div className="flex">
                <BackButton backPath={backPath} />
                <div className="flex">
                  <div className="wr">
                    <h1>{planets?.data?.name}</h1>
                    <div>diametr: {planets?.data?.diameter} km</div>
                    <div>terrain: {planets?.data?.terrain}</div>
                    <div>climate: {planets?.data?.climate}</div>
                    <div>gravity: {planets?.data?.gravity}</div>
                    <div>population: {planets?.data?.population}</div>
                  </div>
                </div>
              </div>
            ) : (
              <p>...Loading</p>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
