import React from "react";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

const OrderPage = (props) => {
  const { authAxios } = props;
  return (
    <div className="widthmargin">
      <OrdersTable authAxios={authAxios} />
    </div>
  );
};

export default OrderPage;
