import * as React from "react";
import VoucherInfo from "./components/VoucherInfo";

function VoucherNew() {
  return (
    <main className="flex flex-col flex-1 justify-start shrink p-[3rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] min-h-[3.75rem] max-md:min-h-[2.75rem]">
        {/* <section className="overflow-hidden grow shrink px-16 pt-16 pb-9 bg-white min-h-[985px] min-w-60 w-[1347px] max-md:px-5 max-md:max-w-full"> */}
          <VoucherInfo />
          {/* <LinkedCourses /> */}
        {/* </section> */}
    </main>
  );
}

export default VoucherNew;
