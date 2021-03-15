import { isEqual, format } from "date-fns";

interface MonthpickerProps {
  headerDate: Date;
  selectedDate: Date;
  changeType: () => void;
  setSelectedDate: (date: Date) => void;
}

export default function Monthpicker({
  headerDate,
  selectedDate,
  changeType,
  setSelectedDate
}: MonthpickerProps) {
  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month: number) => () => {
    setSelectedDate(
      new Date(headerDate.getFullYear(), month, selectedDate.getDate())
    );
    changeType();
  };

  return (
    <div className="flex flex-wrap -mx-1">
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <div key={i} onClick={setMonthValue(i)} style={{ width: "25%" }}>
            <div
              className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                isSelectedMonth(i)
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
            >
              {format(
                new Date(headerDate.getFullYear(), i, headerDate.getDate()),
                "MMM"
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
