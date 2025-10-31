import React, { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
import Select from "react-select";


const CreateTimeTable = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    classId: "",
    weekdays: [],
    noOfPeriods: "",
    classStartTime: "",
    eachPeriodDuration: "",
    breaks: [{ afterPeriod: "", duration: "" }],
  });


  const weekdayOptions = [
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];


  // Fetch classes for dropdown
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await api.get("/classes/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data.sort((a, b) => a.value - b.value)); // ascending
      } catch (error) {
        toast.error("Failed to load classes");
      }
    };
    fetchClasses();
  }, []);

  // Handle weekday selection
  const toggleWeekday = (day) => {
    setForm((prev) => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter((d) => d !== day)
        : [...prev.weekdays, day],
    }));
  };

  // Add new break row
  const addBreak = () => {
    setForm((prev) => ({
      ...prev,
      breaks: [...prev.breaks, { afterPeriod: "", duration: "" }],
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.post("/tt", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        toast.success("✅ Time table created successfully!");
        setForm({
          classId: "",
          weekdays: [],
          noOfPeriods: "",
          classStartTime: "",
          eachPeriodDuration: "",
          breaks: [{ afterPeriod: "", duration: "" }],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(` ${err.response?.data?.message || "Faild to create time table"}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Time Table</h2>
      <form onSubmit={handleSubmit} className="mt-3">

        {/* Class selection */}
        <div className="mb-3">
          <label>Class:</label>
          <select
            className="form-select"
            value={form.classId}
            onChange={(e) => setForm({ ...form, classId: e.target.value })}
            required
          >
            <option value="">Select class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                Class {cls.value}
              </option>
            ))}
          </select>
        </div>

        {/* Weekdays */}
        {/* <div className="mb-3">
          <label>Weekdays:</label><br />
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <label key={day} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={form.weekdays.includes(day)}
                onChange={() => toggleWeekday(day)}
              />{" "}
              {day}
            </label>
          ))}
        </div> */}
       {/* Weekdays Multi-select */}
<div className="mb-3">
  <label>Weekdays:</label>
  <Select
    isMulti
    options={weekdayOptions}
    value={form.weekdays.map(
      (day) => weekdayOptions.find((opt) => opt.value === day)
    )}
    onChange={(selectedOptions) => {
      const selectedValues = selectedOptions.map((option) => option.value);

      // Sort according to the original weekday order
      const ordered = weekdayOptions
        .map((opt) => opt.value)
        .filter((v) => selectedValues.includes(v));

      setForm({
        ...form,
        weekdays: ordered,
      });
    }}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Select weekdays..."
  />
</div>



        {/* No of periods */}
        <div className="mb-3">
          <label>No. of Periods:</label>
          <input
            type="number"
            className="form-control"
            value={form.noOfPeriods}
            onChange={(e) => setForm({ ...form, noOfPeriods: e.target.value })}
            required
          />
        </div>

        {/* Class start time */}
        <div className="mb-3">
          <label>Class Start Time:</label>
          <input
            type="time"
            className="form-control"
            value={form.classStartTime}
            onChange={(e) =>
              setForm({ ...form, classStartTime: e.target.value })
            }
            required
          />
        </div>

        {/* Period duration */}
        <div className="mb-3">
          <label>Each Period Duration (minutes):</label>
          <input
            type="number"
            className="form-control"
            value={form.eachPeriodDuration}
            onChange={(e) =>
              setForm({ ...form, eachPeriodDuration: e.target.value })
            }
            required
          />
        </div>

        {/* Breaks */}
        <div className="mb-3">
          <label>Breaks:</label>
          {form.breaks.map((b, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="number"
                placeholder="After Period"
                className="form-control me-2"
                value={b.afterPeriod}
                onChange={(e) => {
                  const newBreaks = [...form.breaks];
                  newBreaks[index].afterPeriod = e.target.value;
                  setForm({ ...form, breaks: newBreaks });
                }}
                required
              />
              <input
                type="number"
                placeholder="Duration (mins)"
                className="form-control"
                value={b.duration}
                onChange={(e) => {
                  const newBreaks = [...form.breaks];
                  newBreaks[index].duration = e.target.value;
                  setForm({ ...form, breaks: newBreaks });
                }}
                required
              />
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-secondary" onClick={addBreak}>
            + Add Break
          </button>
        </div>

        <button type="submit" className="btn btn-primary">Create Time Table</button>
      </form>
    </div>
  );
};

export default CreateTimeTable;
