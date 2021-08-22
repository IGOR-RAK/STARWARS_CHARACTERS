const LIMIT = 10;

export default function CharactersTablePagination({ page, total, onChange }) {
  const pageTotal = Math.ceil(total / LIMIT);
  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      {Array.from({ length: pageTotal }, (_, index) => index + 1).map(
        (pageIndex) => {
          const isActive = pageIndex === page;
          const action = () => {
            if (pageIndex !== page) {
              onChange(pageIndex);
            }
          };
          return isActive ? (
            <b
              style={{
                cursor: "pointer",
                marginRight: "30px",
                padding: "5px",
                borderBottom: "5px solid lightgreen "

                // borderRadius: "30px"
              }}
              key={pageIndex}
              onClick={action}
            >
              {pageIndex}
            </b>
          ) : (
            <span
              style={{
                cursor: "pointer",
                display: "inline",
                marginRight: "30px",
                padding: "5px"
              }}
              key={pageIndex}
              onClick={action}
            >
              {pageIndex}
            </span>
          );
        }
      )}
    </div>
  );
}
