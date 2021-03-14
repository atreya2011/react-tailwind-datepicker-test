import { useState, useEffect } from "react";
import { isEqual, getDaysInMonth, getDay } from "date-fns";

interface DatepickerProps {
  headerDate: Date;
  selectedDate: Date;
  closeDatepicker: () => void;
  setSelectedDate: (date: Date) => void;
}

export default function Datepicker({
  headerDate,
  selectedDate,
  closeDatepicker,
  setSelectedDate
}: DatepickerProps) {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(headerDate.getFullYear(), headerDate.getMonth(), date)
    );
    closeDatepicker();
  };

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  useEffect(() => {
    getDayCount(headerDate);
  }, [headerDate]);

  return (
    <>
      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map((day, i) => (
          <div key={i} style={{ width: "14.26%" }} className="px-1">
            <div className="text-gray-800 font-medium text-center text-xs">
              {day}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap -mx-1">
        {blankDays.map((bd, i) => (
          <div
            key={i}
            style={{ width: "14.26%" }}
            className="text-center border p-1 border-transparent text-sm"
          ></div>
        ))}
        {dayCount.map((d, i) => (
          <div key={i} style={{ width: "14.26%" }} className="px-1 mb-1">
            <div
              onClick={setDateValue(d)}
              className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                isToday(d)
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
