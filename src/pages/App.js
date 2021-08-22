import "../styles.css";
import "antd/dist/antd.css";
import { Col, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CharactersTable from "../components/CharactersTable";
import CharactersTablePagination from "../components/CharactersTablePagination";
import { FETCH_CHARACTERS } from "../redux/reducers/characters/actions";
import { selectCharacters } from "../redux/reducers/characters/selectors";
import { Typography } from "antd";
import Header from "../components/Header";
const { Title } = Typography;

function App() {
  const characters = useSelector(selectCharacters);
  const dispatch = useDispatch();

  //console.log("store", store);

  const changePage = (newPage) => {
    dispatch({
      type: FETCH_CHARACTERS,
      payload: {
        page: newPage,
        search: characters.search
      }
    });
  };

  const search = (e) => {
    dispatch({
      type: FETCH_CHARACTERS,
      payload: {
        page: 1,
        search: e.target.value
      }
    });
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col span={16}>
          <Header />

          <Input
            style={{ width: "30%", marginBottom: "20px" }}
            type="text"
            value={characters.search}
            placeholder="Search characters..."
            onChange={search}
            size="large"
          />

          {characters.loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <CharactersTable characters={characters} />

              <Row justify="center" style={{ marginTop: "40px" }}>
                <Col span={8}>
                  <CharactersTablePagination
                    total={characters.data.count}
                    page={characters.page}
                    onChange={changePage}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
