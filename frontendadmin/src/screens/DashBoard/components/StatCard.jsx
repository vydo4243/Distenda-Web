export default function StatCard({ title, value, percentage, iconSrc }) {
  return (
    <div className="flex flex-col flex-1  w-full items-center self-center px-3 max-md:px-5 pt-1.5 pb-2 my-auto rounded-3xl bg-[#6C8299] min-w-[12.5rem] max-md:w-auto max-w-full h-auto">
      <div className="flex items-center px-3 py-2 w-full text-[1.25rem]">
        <img
          loading="lazy"
          src={iconSrc}
          alt={`${title} icon`}
          className="object-contain shrink-0 mr-2 self-center my-auto aspect-square w-[2rem]"
        />
        <div className="flex grow basis-0 text-white text-[1.25rem] max-md:text-[1.125rem] font-medium leading-tight shrink self-start items-center my-auto min-h-[3.75rem] max-md:min-h-[2.75rem]">
          {title}
        </div>
      </div>
      <div className="flex gap-2 items-center px-3 py-2 w-full text-[1.75rem] max-md:text-[1.25rem] font-semibold whitespace-nowrap min-h-[3.75rem] max-md:min-h-[2.75rem]">
        <div className="flex shrink gap-2 self-center my-auto w-full">
          {value}
        </div>
      </div>
      <div className="flex gap-2 items-end px-3 py-2 w-full text-[1.125rem] max-md:text-[1rem] min-h-[3.75rem] max-md:min-h-[2.75rem]">
        <div className="flex shrink gap-2.5 self-center w-full ">
          {percentage > 0 ? `Tăng ${percentage.toFixed(2)}%` : `Giảm ${percentage.toFixed(2)}%`}
        </div>
      </div>
    </div>
  );
}