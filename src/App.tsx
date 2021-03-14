import { useState, useEffect } from "react";
import {
  format,
  isEqual,
  subMonths,
  getDaysInMonth,
  getDay,
  addMonths
} from "date-fns";

export default function App() {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());

  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    setShowDatepicker(false);
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

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const decrementMonth = () =>
    setDatepickerHeaderDate((prev) => subMonths(prev, 1));

  const incrementMonth = () =>
    setDatepickerHeaderDate((prev) => addMonths(prev, 1));

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200 ">
      <div className="antialiased sans-serif">
        <div>
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label
                htmlFor="datepicker"
                className="font-bold mb-1 text-gray-700 block"
              >
                Select Date
              </label>
              <div className="relative">
                <input type="hidden" name="date" />
                <input
                  type="text"
                  readOnly
                  className="cursor-pointer w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Select date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onClick={toggleDatepicker}
                />
                <div
                  className="cursor-pointer absolute top-0 right-0 px-3 py-2"
                  onClick={toggleDatepicker}
                >
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {showDatepicker && (
                  <div
                    className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
                    style={{ width: "17rem" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={decrementMonth}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-grow cursor-pointer hover:bg-gray-200 rounded-lg">
                        <span className="text-lg font-bold text-gray-800">
                          {format(datepickerHeaderDate, "MM")}
                        </span>
                      </div>
                      <div className="flex-grow cursor-pointer hover:bg-gray-200 rounded-lg">
                        <span className="text-lg font-bold text-gray-800">
                          {format(datepickerHeaderDate, "yyyy")}
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={incrementMonth}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-3 -mx-1">
                      {DAYS.map((day, i) => (
                        <div
                          key={i}
                          style={{ width: "14.26%" }}
                          className="px-1"
                        >
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
                        <div
                          key={i}
                          style={{ width: "14.26%" }}
                          className="px-1 mb-1"
                        >
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
