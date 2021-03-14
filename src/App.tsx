import { useState } from "react";
import { format, subMonths, addMonths } from "date-fns";
import Datepicker from "./Datepicker";

type DatepickerType = "date" | "month" | "year";

export default function App() {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [type, setType] = useState<DatepickerType>("date");

  const decrementMonth = () =>
    setDatepickerHeaderDate((prev) => subMonths(prev, 1));

  const incrementMonth = () =>
    setDatepickerHeaderDate((prev) => addMonths(prev, 1));

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const handleDatepickerClose = () => setShowDatepicker(false);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("year");

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
                      <div
                        onClick={showMonthPicker}
                        className="flex-grow cursor-pointer hover:bg-gray-200 rounded-lg"
                      >
                        <span className="text-lg font-bold text-gray-800">
                          {format(datepickerHeaderDate, "MM")}
                        </span>
                      </div>
                      <div
                        onClick={showYearPicker}
                        className="flex-grow cursor-pointer hover:bg-gray-200 rounded-lg"
                      >
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
                    {type === "date" && (
                      <Datepicker
                        headerDate={datepickerHeaderDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        closeDatepicker={handleDatepickerClose}
                      />
                    )}
                    {type === "month" && (
                      <Datepicker
                        headerDate={datepickerHeaderDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        closeDatepicker={() => setShowDatepicker(false)}
                      />
                    )}{" "}
                    {type === "year" && (
                      <Datepicker
                        headerDate={datepickerHeaderDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        closeDatepicker={() => setShowDatepicker(false)}
                      />
                    )}
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
