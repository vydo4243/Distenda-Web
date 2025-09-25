"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { marked } from "marked";
import ChatArea from "./ChatArea";
import ChatArea2 from "./ChatArea2";
import ChatingInput from "./ChatingInput";
import { getGeminiReply } from "./gemini";
import Loading from "../../../components/Loading";
import LoadingMessage from "../../../components/LoadingMessage";

function AIChating() {
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [globalContext, setGlobalContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);

  // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Lấy thông tin user và context khi mở ChatBot
  useEffect(() => {
    const initChatbot = async () => {
      setLoading(true);
      try {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/user/me`);
        const resUser = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/me`,
          {
            withCredentials: true,
          }
        );
        setCurrentUser(resUser.data);

        const resContext = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/site-context`
        );
        setGlobalContext(resContext.data);
      } catch (err) {
        console.error("Lỗi khởi tạo chatbot:", err);
      }
      setLoading(false);
    };
    initChatbot();
  }, []);

  const handleSendMessage = async (newMessage) => {
    setLoadingPopup(true);
    if (!globalContext) {
      console.warn("⚠️ Đang tải dữ liệu, vui lòng đợi...");
      return;
    }

    setMessages((prev) => [...prev, newMessage]);

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    // Khai báo biến này trước khi kiểm tra
    const lowerCaseMsg = newMessage.message.toLowerCase();

    // Kiểm tra câu hỏi về phương thức thanh toán
    const isPaymentMethodQuestion =
      (lowerCaseMsg.includes("phương thức") &&
        lowerCaseMsg.includes("thanh toán")) ||
      lowerCaseMsg.includes("thanh toán bằng") ||
      lowerCaseMsg.includes("cách thanh toán");

    if (isPaymentMethodQuestion) {
      const botMessage = {
        isUser: false,
        message: "💳 Bạn có thể thanh toán bằng MoMo và ZaloPay.",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoadingPopup(false);
      return;
    }

    // Tạo user context
    const formatUserCourse = (courses) => {
      if (!courses || courses.length === 0) return "Chưa đăng ký khóa học nào";
      setLoadingPopup(false);
      return courses
        .map(
          (course, index) =>
            `Khóa học ${index + 1}:\n  - CourseId: ${
              course.CourseId
            }\n  - Trạng thái: ${course.CourseStatus}\n  - Đánh giá: ${
              course.CourseReview
            }\n`
        )
        .join("\n");
    };

    const userContext = currentUser
      ? `Thông tin người dùng:\n- Tên: ${
          currentUser.UserFullName
        }\n- Khóa học:\n${formatUserCourse(
          currentUser.UserCourse
        )}\n- Khóa học quan tâm: ${currentUser.UserLikes}\n\n`
      : "";

    const finalPrompt = `${globalContext}\n${userContext}\nCâu hỏi: ${newMessage.message}`;

    const aiReply = await getGeminiReply(finalPrompt);
    const formattedReply = marked(aiReply);

    const botMessage = {
      isUser: false,
      message: formattedReply,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoadingPopup(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const newMessage = {
      isUser: true,
      message: suggestion,
      time: new Date().toLocaleTimeString(),
    };
    handleSendMessage(newMessage);
  };
  if (loading) return <Loading />;
  return (
    <main className="h-screen w-full flex flex-col bg-center bg-cover backdrop-blur-[10px] max-md:px-5 max-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col justify-center max-h-[calc(100vh-200px)]">
        {hasStartedChat ? (
          <ChatArea2 messages={messages} />
        ) : (
          <ChatArea onSuggestionClick={handleSuggestionClick} />
        )}
      </div>
      <div className="flex-col w-full justify-center">
        {loadingPopup && (
          <div className="w-full flex items-center justify-center">
            <div className="w-[80%] items-start max-lg:mb-[12px] mb-3">
              <LoadingMessage />
            </div>
          </div>
        )}
        <ChatingInput
          onSendMessage={handleSendMessage}
          setLoadingPopup={setLoadingPopup}
        />
      </div>
    </main>
  );
}

export default AIChating;
