import { Link } from "react-router-dom";

export default function StarshipsName({ starships }) {
  return (
    <div>
      <ul>
        {starships.map((s) => (
          <Link to={`/starships/${s.url.replaceAll(/\D/g, "")}`}>
            <li>{s.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
