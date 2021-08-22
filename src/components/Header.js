import { Link } from "react-router-dom";
import { Typography } from "antd";
const { Title } = Typography;

export default function Header() {
  return (
    <div className="header_container">
      <div className="header">
        {/* <div style={{width:"40px", height:"40px", background: "blue"}}></div>
      <div className="menu_item " style={{width:"40px", height:"40px", background: "red"}} ></div> */}

        <div
          style={{
            padding: "20px",
            textShadow: " 2px 2px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <Title>Starwars Characters</Title>
        </div>

        <div className="navbar">
          <div className="menu">
            <div className="menu_item">
              <Link to={`/`}>Characters</Link>
            </div>

            <div className="menu_item">
              <Link to={`/about`}>About</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
