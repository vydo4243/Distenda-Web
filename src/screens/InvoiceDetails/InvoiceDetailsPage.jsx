import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CustomerInfo from './components/CustomerInfo';
import OrderTable from './components/OrderTable';
import { useParams } from "react-router-dom";
import { payDetailController } from "../../controllers/pay.controller";
import Loading from "../../components/Loading";

function InvoiceDetails() {
  const { PayID } = useParams(); // Lấy giá trị PayID từ URL
  console.log("ID from URL: ", PayID);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // console.log("vao")
      const result = await payDetailController(PayID, setLoading);
      console.log("Result from payDetailController: ", result);
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
    }

    fetchData();
  }, [PayID]);

  if (loading) {
    return (
      <Loading />
    )
  }
  console.log("PayDetail => ", data)

  return (
    <>
      <Helmet>
        <title>Chi tiết hóa đơn</title>
      </Helmet>
    <div className="flex flex-col flex-1 justify-start items-center shrink p-[3rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] min-h-[3.75rem] max-md:min-h-[2.75rem]">
      {data?.user && <CustomerInfo data={data} />}
      {data?.course && <OrderTable items={[data.course]} />}
    </div>
  </>
  );
}

export default InvoiceDetails;