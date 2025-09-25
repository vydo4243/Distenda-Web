import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../layouts/private/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { usersController } from "../../controllers/user.controller";
import Loading from "../../components/Loading";
import moment from 'moment';

function UserTable() {
  const [allUsers, setAllUsers] = useState([]);           // Dữ liệu gốc từ API
  const [filteredUsers, setFilteredUsers] = useState([]); // Dữ liệu sau khi lọc

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const result = await usersController(setLoading);
      if (result) {
        setAllUsers(result);
        setFilteredUsers(result);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (value) => {
    const keyword = value.toLowerCase();

    const filtered = allUsers.filter(user => {
      const fullName = user.UserFullName?.toLowerCase() || "";
      const joinDate = moment(user.createdAt).format("DD/MM/YYYY hh:mm:ss");
      const lastUpdate = moment(user.updatedAt).format("DD/MM/YYYY hh:mm:ss");
      const money = user.UserMoney?.toString() || "";

      const statusText = user.UserStatus === 1 ? "đang hoạt động" : "đã chặn";

      return (
        fullName.includes(keyword) ||
        joinDate.includes(keyword) ||
        lastUpdate.includes(keyword) ||
        money.includes(keyword) ||
        statusText.includes(keyword)
      );
    });

    setFilteredUsers(filtered);
  };


  if (loading) {
    return (
      <Loading />
    )
  }
  console.log("users => ", filteredUsers);
  const totalUser = filteredUsers.length;

  return (
    <>
      <Helmet>
        <title>Người dùng</title>
      </Helmet>
      <div className="flex flex-col flex-1 justify-center items-center shrink p-[4rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] max-md:max-w-full">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col mt-6 w-full text-[#171717] max-md:max-w-full">
          <div className="text-right max-md:max-w-full">
            Tổng số người dùng: {totalUser}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-[4rem] mt-[1.5rem] w-full text-[#171717] max-md:max-w-full">
          <TableHeader />
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <TableRow key={index} {...user} />
            ))
          ) : (
            <p className="mt-[1rem] text-center">Không tìm thấy người dùng nào.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserTable;
