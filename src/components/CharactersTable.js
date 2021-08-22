import { Link } from "react-router-dom";
import { Table, Tag } from "antd";

export default function CharactersTable({ characters }) {
  const data = characters.data.results.map((c, index) => {
    return {
      key: index,
      name: c.name,
      gender: [c.gender],
      detail: c.url,
      birth_year: c.birth_year
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "detail",
      key: "name",

      render: (text, item) => {
        const name = item.name;
        const id = text.replaceAll(/\D/g, "");
        //console.log(item);
        return (
          <span>
            <Link to={`/people/${id}`}>{name}</Link>
          </span>
        );
      },
      sorter: (x, y) => {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      }
    },

    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => {
        return (
          Number(b.birth_year.replaceAll(/[A-z]/g, "")) -
          Number(a.birth_year.replaceAll(/[A-z]/g, ""))
        );
      }
    },

    {
      title: "Gender",

      dataIndex: "gender",
      responsive: ["md"],

      key: "gender",

      render: (gender) => (
        <>
          {gender.map((tag) => {
            let color = tag.length > 5 ? "green" : "red";
            if (tag === "male") {
              color = "geekblue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: "Male",
          value: "male"
        },
        {
          text: "N/A",
          value: "n/a"
        },
        {
          text: "Female",
          value: "female"
        },
        {
          text: "Hermaphrodite",
          value: "hermaphrodite"
        }
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0
      //onFilter: (value, record) => record.gender.includes(value),
    },

    {
      title: "Details",
      dataIndex: "detail",
      key: "key",
      responsive: ["md"],
      render: (text) => {
        const id = text.replaceAll(/\D/g, "");
        return <Link to={`/people/${id}`}>Details...</Link>;
      }
    }
  ];

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }
  return (
    <div>
      {characters.loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ["none", "none"] }}
          //onChange={onChange}
        />
      )}
    </div>
  );
}
