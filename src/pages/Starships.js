import { useSelector } from "react-redux";
import ContentsReceiver from "../HOC/ContentsReceiver";
import PageReceiver from "../HOC/PageReceiver";

export default function Starships() {
  const starships = useSelector((s) => s?.starships?.data);
  const backPath = useSelector((s) => s.details.path);

  return (
    <PageReceiver>
      <ContentsReceiver data={starships} path={backPath}>
        <h1>{starships.name}</h1>
        <div>
          <div>name: {starships.name}</div>
          <div>model: {starships.model}</div>
          <div>manufacturer: {starships.manufacturer}</div>
          <div>starship class: {starships.starship_class}</div>
        </div>
      </ContentsReceiver>
    </PageReceiver>
  );
}
