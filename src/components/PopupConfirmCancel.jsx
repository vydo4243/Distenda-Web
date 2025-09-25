export const PopupConfirmCancel = ({ isVisible, content, confirm, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] px-2">
      <div className="flex flex-col justify-center md:px-[2.5rem] md:py-[4rem] py-[2rem] px-[1.5rem] bg-white rounded-3xl md:w-[37rem] w-[25rem]  font-semibold">
        <div className="flex flex-col items-center w-full text-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/e5f9826e22b01b1c8bd327296b2948721450b01230f9c87f02d8f9a1ed2e4ddb?apiKey=7a79403a23cb489f853e4845c47ede19&"
            alt="Popup Icon"
            className="object-contain aspect-square w-[3.5rem] max-md:w-[2.5rem]"
          />
          <p className="mt-6 text-[1.25rem] max-md:text-[1rem] text-neutral-900 font-medium text-center">{content}</p>
          <div className="mt-4 flex gap-3 justify-center items-center rounded-lg text-[1.5rem] max-md:text-[1.125rem]">
            <button
              className="md:w-[9.375rem] md:h-[3.75rem] w-[5rem] h-[3rem] bg-[#DF322B] text-white rounded-lg flex justify-center items-center hover:bg-red-700"
              onClick={onConfirm}
            >{confirm}
            </button>
            <button
              className="md:w-[9.375rem] md:h-[3.75rem] w-[5rem] h-[3rem] bg-[#CDD5DF] text-[#14375F] rounded-lg flex justify-center items-center hover:bg-gray-400"
              onClick={onCancel}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

