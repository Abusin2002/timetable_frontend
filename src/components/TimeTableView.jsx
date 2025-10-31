import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TimeTablePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch classes for dropdown
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await api.get("/classes/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data.length) {
          toast.info("No classes found.");
          return;
        }

        setClasses(res.data);
        setSelectedClass(res.data[0]); // auto-select first
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load classes");
      }
    };
    fetchClasses();
  }, []);

  // Fetch timetable when selected class changes
// Fetch timetable whenever class changes
useEffect(() => {
  if (!selectedClass) return;

  const fetchTimeTable = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.get(`/tt/${selectedClass}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //  API returns an array — filter by selected class
      const allTables = res.data;
      const table = allTables.find(
        (t) => t.classId?._id === selectedClass._id
      );

      if (table) {
        setTimetable(table);
      } else {
        setTimetable(null);
        // toast.warn("No timetable found for this class");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTimetable(null);
      toast.error("Failed to fetch timetable");
    }
  };

  fetchTimeTable();
}, [selectedClass]);


  // --- Helpers ---
  const timeToMinutes = (t) => {
    if (!t) return 0; // safeguard
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const generateSchedule = () => {
    if (!timetable || !timetable.classStartTime) return [];

    const start = timeToMinutes(timetable.classStartTime);
    let current = start;
    const periods = [];

    for (let i = 1; i <= timetable.noOfPeriods; i++) {
      const s = minutesToTime(current);
      current += timetable.eachPeriodDuration;
      const e = minutesToTime(current);

      periods.push({ label: `Period ${i}`, start: s, end: e });

      const br = timetable.breaks?.find((b) => b.afterPeriod === i);
      if (br) {
        const bs = minutesToTime(current);
        current += br.duration;
        const be = minutesToTime(current);
        periods.push({
          label: `Break (${br.duration}m)`,
          start: bs,
          end: be,
          isBreak: true,
        });
      }
    }

    return periods;
  };

  const schedule = generateSchedule();


  // ================================================

 

// add these states:
const [showModal, setShowModal] = useState(false);
const [subjects, setSubjects] = useState([]);
const [staffs, setStaffs] = useState([]);
const [selectedPeriod, setSelectedPeriod] = useState(null);
const [formData, setFormData] = useState({
  subject: "",
  staff: "",
});

// fetch subjects & staffs
useEffect(() => {
  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const [subRes, staffRes] = await Promise.all([
        api.get("/subjects", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/staffs", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSubjects(subRes.data);
      setStaffs(staffRes.data);
    } catch (err) {
      console.error(err);
      toast.error(`${err.response.data.message || "Server error"}`);
    }
  };
  fetchData();
}, []);

// open modal when clicking a cell
const handleCellClick = (day, periodNumber) => {
  setSelectedPeriod({ day, periodNumber });
  setShowModal(true);
};

// handle save
const handleSave = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const payload = {
      classId: selectedClass._id,
      weekday: selectedPeriod.day,
      periodNumber: selectedPeriod.periodNumber,
      subject: formData.subject,
      staff: formData.staff,
    };

    await api.post("/ttentry", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Assigned successfully!");
    setShowModal(false);
    setFormData({ subject: "", staff: "" });
    
    //  fetchTimeTable();
    const res = await api.get(`/ttentry?classId=${selectedClass._id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
setEntries(res.data);

  } catch (err) {
    console.error(err);
      toast.error(`${err.response.data.message || "Server error"}`);

    // toast.error("Failed to assign subject/staff");
  }
};

// ------------------------------------------------

const [entries, setEntries] = useState([]);

useEffect(() => {
  if (!selectedClass) return;

  const fetchEntries = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.get(`/ttentry?classId=${selectedClass._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch timetable entries:", err);
      setEntries([]);
    }
  };

  fetchEntries();
}, [selectedClass]);

  // --- Render ---
  return (
    <>  
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>
      Assign Subject & Staff
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedPeriod && (
      <div>
        <p>
          <strong>Class:</strong> {selectedClass?.value}<br />
          <strong>Day:</strong> {selectedPeriod.day}<br />
          <strong>Period:</strong> {selectedPeriod.periodNumber}
        </p>

        <div className="mb-3">
          <label>Subject</label>
          <Select
            options={subjects.map((s) => ({
              value: s._id,
              label: s.name,
            }))}
            value={
              formData.subject
                ? {
                    value: formData.subject,
                    label:
                      subjects.find((s) => s._id === formData.subject)?.name ||
                      "",
                  }
                : null
            }
            onChange={(opt) =>
              setFormData({ ...formData, subject: opt.value })
            }
            placeholder="Select subject"
          />
        </div>

        <div className="mb-3">
          <label>Staff</label>
          <Select
            options={staffs.map((s) => ({
              value: s._id,
              label: s.name,
            }))}
            value={
              formData.staff
                ? {
                    value: formData.staff,
                    label:
                      staffs.find((s) => s._id === formData.staff)?.name || "",
                  }
                : null
            }
            onChange={(opt) =>
              setFormData({ ...formData, staff: opt.value })
            }
            placeholder="Select staff"
          />
        </div>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>


    {/* // ============================================================== */}
    <div className="container mt-4">
      {/* Select Class */}
      <div className="mb-3">
        <label className="form-label fw-bold">Select Class:</label>
        <Select
          options={classes.map((cls) => ({
            value: cls._id,
            label: `Class ${cls.value}`,
          }))}
          value={
            selectedClass
              ? {
                  value: selectedClass._id,
                  label: `Class ${selectedClass.value}`,
                }
              : null
          }
          onChange={(opt) =>
            setSelectedClass(classes.find((c) => c._id === opt.value))
          }
          placeholder="Select a class..."
        />
      </div>

      {/* Loading / Error / Table */}
      {loading ? (
        <div className="alert alert-info mt-4">Loading timetable...</div>
      ) : timetable ? (
        <div className="mt-4">
          <h3>
            Time Table for <strong>Class {timetable.classId?.value}</strong>
          </h3>
          <table className="table table-bordered text-center mt-3">
            <thead className="table-light">
              <tr>
                <th>Weekday</th>
                {schedule.map((p, i) => (
                  <th key={i}>
                    {p.label}
                    <br />
                    <small>
                      {p.start} - {p.end}
                    </small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.weekdays.map((day) => (
                <tr key={day}>
                  <td className="fw-bold">{day}</td>
                  {schedule.map((p, i) => (
                    // <td
                    //   key={i}
                    //   style={{
                    //     backgroundColor: p.isBreak ? "#f8d7da" : "#d1e7dd",
                    //     fontWeight: p.isBreak ? "500" : "normal",
                    //   }}
                    // >
                    //   {p.isBreak ? "Break" : "No Data"}
                    // </td>
                   <td
  key={i}
  style={{
    backgroundColor: p.isBreak ? "#f8d7da" : "#d1e7dd",
    fontWeight: p.isBreak ? "500" : "normal",
    cursor: p.isBreak ? "default" : "pointer",
  }}
  onClick={() => {
    if (!p.isBreak) handleCellClick(day, i + 1);
  }}
>
  {p.isBreak ? (
    "Break"
  ) : (
    (() => {
      const match = entries.find(
        (e) =>
          e.weekday === day && e.periodNumber === i + 1
      );
      if (match) {
        const subj = subjects.find((s) => s._id === match.subject)?.name || "—";
        const staff = staffs.find((s) => s._id === match.staff)?.name || "—";
        return (
          <div>
            <strong>{subj}</strong>
            <br />
            <small>{staff}</small>
          </div>
        );
      } else {
        return "No Data";
      }
    })()
  )}
</td>


                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning mt-4">
          ⚠️ No timetable found for this class.
        </div>
      )}
    </div>

    </>
  );
};

export default TimeTablePage;
