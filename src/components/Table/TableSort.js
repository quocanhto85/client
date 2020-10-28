import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable } from "mdbreact";
import { formatDate } from "../../utils";

const columns = [
  {
    label: "STT",
    field: "number",
    sort: "asc",
    width: 100,
  },
  {
    label: "Ngày",
    field: "date",
    sort: "asc",
    width: 150,
  },
  {
    label: "Dịch Vụ",
    field: "name",
    sort: "asc",
    width: 200,
  },
  {
    label: "Số Lượng",
    field: "count",
    sort: "asc",
    width: 100,
  },
];

const TableSort = (props) => {
  let [dataChart, setDataChart] = useState({ columns, rows: [] });

  const { sort = [] } = props;
  useEffect(() => {
    const newRows = sort
      .map((data) => {
        const { _id, ...rest } = data;
        return { ...rest };
      })
      .map((data, i) => {
        data.date = formatDate(data.date);
        Object.assign(data, { number: i + 1 });
        return data;
      });
    dataChart.rows = newRows;
    setDataChart({ ...dataChart });
  }, [sort]);

  return (
    <div>
      <br />
      <h3>Dữ Liệu Tìm Kiếm:</h3>
      <br />
      <MDBDataTable striped bordered hover small data={dataChart} />
    </div>
  );
};

export default TableSort;
