import React from 'react';
import moment from 'moment';

function PersonalInfo({data}) {
  const personalDetails = [
    { label: 'Họ và tên', value: data.UserFullName },
    { label: 'Số điện thoại', value: data.UserPhone },
    { label: 'Gmail', value: data.UserEmail },
    { label: 'Ngày tham gia', value: moment(data.createdAt).format("DD/MM/YYYY hh:mm:ss")},
    { label: 'Cập nhật lần cuối', value: moment(data.createdAt).format("DD/MM/YYYY hh:mm:ss") }
  ];

  return (
    <div className="flex flex-col mt-[2.5rem] w-full max-md:max-w-full">
      <div className="text-[1.25rem] max-md:text-[1rem] font-semibold text-[#171717] max-md:max-w-full">
        Thông tin cá nhân
      </div>
      <div className="flex flex-col mt-[1.5rem] w-full text-[1.125rem] max-md:text-[1rem] max-md:max-w-full">
        <div className="flex flex-wrap gap-[0.5rem] items-start w-full max-md:max-w-full">
          {personalDetails.slice(0, 3).map((detail, index) => (
            <div key={index} className="flex flex-col min-w-[15rem] w-[16.875rem]">
              <div className="font-semibold text-[#171717] text-opacity-50">
                {detail.label}
              </div>
              <div className="mt-[0.5rem] font-medium text-[#171717]">
                {detail.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-[0.5rem] items-center mt-[1rem] w-full max-md:max-w-full">
          {personalDetails.slice(3).map((detail, index) => (
            <div key={index} className="flex flex-col self-stretch my-auto min-w-[15rem] w-[16.875rem]">
              <div className="font-semibold text-[#171717] text-opacity-50">
                {detail.label}
              </div>
              <div className="mt-[0.5rem] font-medium text-[#171717]">
                {detail.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;