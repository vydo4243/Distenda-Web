import React from 'react';
import OrderTableRow from './OrderTableRow';

function OrderTable({ items }) {
  return (
    <>
        <div className="flex overflow-hidden w-full mt-[1.25rem] rounded-t-[1.5rem] bg-[#EBF1F9] min-h-[3.75rem] max-md:min-h-[2.75rem]">
          <div className="flex basis-1/3 min-w-0 justify-center items-center text-white bg-[#6C8299]">
            <div className="gap-2.5 self-stretch text-center my-auto">Mã khóa học</div>
          </div>
          <div className="flex basis-1/3 min-w-0 justify-center items-center text-[#171717]">
            <div className="gap-2.5 self-stretch text-center my-auto">Tên khóa</div>
          </div>
          <div className="flex basis-1/3 min-w-0 justify-center items-center text-white bg-[#6C8299]">
            <div className="gap-2.5 self-stretch text-center my-auto">Giá</div>
          </div>
        </div>
        {items?.map((item, index) => (
          <OrderTableRow key={index} data={item} />
        ))}
    </>
  );
}

export default OrderTable;
