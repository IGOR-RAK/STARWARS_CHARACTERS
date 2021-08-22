import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function BackButton({ backPath }) {
  return (
    <div>
      <div className="backBtn">
        <button style={{ padding: "5px" }} onClick={() => {}}>
          <Link to={`${backPath}`}>
            <ArrowLeftOutlined />
            BACK
          </Link>
        </button>
      </div>
    </div>
  );
}
