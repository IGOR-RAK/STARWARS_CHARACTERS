import BackButton from "../components/BackButton";

export default function ContentsReceiver({ children, data, path }) {
  return (
    <div>
      {data ? (
        <div className="flex">
          <BackButton backPath={path} />
          <div className="wr">{children}</div>
        </div>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
}
