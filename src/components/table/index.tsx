import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

type TableAdminProps = {
  columns: ColumnsType<object>;
  data: object[] | undefined;
};

const TableAdmin: React.FC<TableAdminProps> = ({ columns, data }) => (
  <Table columns={columns} dataSource={data}  />
);

export default TableAdmin;
