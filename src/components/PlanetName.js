import { Link } from "react-router-dom";

export default function PlanetName({ planet, id, name }) {
  return (
    <div>
      <h3
        style={{
          background: "rgb(216, 238, 190)"
        }}
      >
        Home planet of the character
      </h3>
      <ul>
        <Link to={`/planets/${id.replaceAll(/\D/g, "")}`}>
          <li>{planet.name}</li>
        </Link>
      </ul>
    </div>
  );
}
