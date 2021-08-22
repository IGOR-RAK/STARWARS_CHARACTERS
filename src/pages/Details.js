import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlanetName from "../components/PlanetName";
import StarshipsName from "../components/StarhipsNames";
import { BACK_TO_DETAILS } from "../redux/reducers/actions";
import BackButton from "../components/BackButton";
import Header from "../components/Header";

export default function Details() {
  const path = useSelector((s) => s.router.location.pathname);
  const details = useSelector((s) => s.details);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [planet, setPlanet] = useState({ name: "" });
  const [loadingShips, setLoadingShips] = useState(true);
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    if (path) {
      dispatch({ type: BACK_TO_DETAILS, payload: path });
    }
  }, []);

  useEffect(() => {
    function fetchPlanet(data) {
      fetch(`${data}`)
        .then((res) => res.json())
        .then((json) => {
          setPlanet((actual) => {
            return { ...actual, name: json.name };
          });
          setLoading(false);
        });
    }
    fetchPlanet(details?.data?.homeworld);
  }, [details]);

  useEffect(() => {
    function fetchShips(data) {
      for (let i = 0; i < details?.data?.starships?.length; i++) {
        fetch(`${data[i]}`)
          .then((res) => res.json())
          .then((json) => {
            setStarships((actual) => {
              return [...actual, { name: json.name, url: json.url }];
            });
          });

        setLoadingShips(false);
      }
    }
    fetchShips(details?.data?.starships);
    setLoadingShips(false);
  }, [details]);

  return (
    <Row justify="center" align="middle">
      <Col span={16}>
        <Header />
        <div className="flex">
          <BackButton backPath="/" />

          <div className="wr">
            {details?.loading ? (
              <div>...Loading</div>
            ) : (
              <div className="flex">
                <h2 style={{ marginTop: "20px" }}>{details.data.name}</h2>

                <h3
                  style={{
                    display: "inline",
                    marginTop: "40px",
                    background: "rgb(216, 238, 190)"
                  }}
                >
                  Physical state
                </h3>

                <ul>
                  <li>Height : {details.data.height}</li>
                  <li>Mass : {details.data.mass}</li>
                  <li>Hair Color : {details.data.hair_color}</li>
                  <li>Eye Color : {details.data.eye_color}</li>
                  <li>Skin Color : {details.data.skin_color}</li>
                </ul>
              </div>
            )}

            <div className="flex">
              {loading ? (
                <div>...Loading</div>
              ) : (
                <PlanetName
                  planet={planet}
                  id={details?.data?.homeworld}
                  name={details.data.name}
                />
              )}

              {loadingShips ? (
                <div>...Loading</div>
              ) : (
                <div>
                  <div>
                    <h3
                      style={{
                        background: "rgb(216, 238, 190)"
                      }}
                    >
                      Starships piloted by {details?.data?.name}
                    </h3>
                    <StarshipsName starships={starships} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
