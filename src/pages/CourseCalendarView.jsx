import { useEffect, useState, useCallback } from "react";
import apiService from "@/services/apiService.js";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TooltipInformation } from "@/components/partitions/TooltipInformation";
import {
  getUserInfo,
  isAdminLoggedIn,
  isStudentLoggedIn,
} from "@/services/AuthService.js";
import { toaste } from "@/components/partitions/ToastNotifications.jsx";
import AlertModal from "@/components/partitions/AlertModal.jsx";
import Sleep from "@/components/partitions/Sleep.js";



async function handleDeleteCourse(course_id) {
  const result = await apiService("delete", `/courses/${course_id}/`);

  if (result.data) {
    toaste.show("Success", "Course Deleted Successfully!", 2500, "success");
  } else {
    toaste.show("Failed!", result.message, 2500, "danger");
  }

  await Sleep(1000);
  window.location.href = "/";
}


export default function CourseCalendarView() {
  const isUserLoggedIn = isStudentLoggedIn();
  const adminIsLogged = isAdminLoggedIn();

  const { id } = useParams();

  const [courseCalendar, setCourseCalendar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function is_selected(student_picks) {
    const user_info = getUserInfo();
    const user_id = user_info.id;
    const result = student_picks.some(
      (item) => parseInt(item.student.id) === parseInt(user_id)
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  
  async function handleActivateSlot(slot_id, slot_status) {
    let result = null;
    if (slot_status) {
      result = await apiService("post", `/slots/${slot_id}/deactivate/`);
    } else {
      result = await apiService("post", `/slots/${slot_id}/activate/`);
    }

    if (result.data) {
      toaste.show(
        "Success",
        "Slot status changed successfully!",
        2500,
        "success"
      );
    } else {
      toaste.show("Failed!", result.message, 2500, "danger");
    }

    setCourseCalendar(result.data.course)
    
  }

  const fetchCalendar = useCallback(async () => {
    setLoading(true);

    const result = await apiService("get", `/course/calendar/${id}`);
    if (result.data) {
      setCourseCalendar(result.data);
    } else {
      setError(result.message);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCalendar();
  }, [id, fetchCalendar]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data {error.message}</div>;

  const days = [...new Set(courseCalendar.calendar_slots.map((s) => s.day))];
  const times = [...new Set(courseCalendar.calendar_slots.map((s) => s.time))];

  const calendarMap = {};
  courseCalendar.calendar_slots.forEach((slot) => {
    if (!calendarMap[slot.day]) calendarMap[slot.day] = {};
    calendarMap[slot.day][slot.time] = slot;
  });


  function setColor(status, count) {
    if (status && count > 0) {
      return "";
    } else if (!status) {
      return "btn-secondary opacity-25";
    } else if (status && count === 0) {
      return "btn-info opacity-25";
    }
  }

  function setOpacity(status, count) {
    if (status) {
      if (count > 0) {
        return `rgba(0,0,255,${count * 0.2})`;
      }
    }
  }

  async function handleRegisterStudentSlot(slotId, is_selected) {
  const student_id = localStorage.getItem("student_id");

  let result = null;
  if (!is_selected) {
    result = await apiService("post", `/register-slot/select/`, {
      calendar_slot: slotId,
      student: student_id,
    });
  } else {
    result = await apiService("post", `/register-slot/deselect/`, {
      calendar_slot: slotId,
      student: student_id,
    });
  }

  setCourseCalendar(result.data.course)

  if (result.data) {
    toaste.show("Success", "Data saved successfully!", 2500, "success");
  } else {
    toaste.show("Failed!", result.message, 2500, "danger");
  }


}

  return (
    <div>
      <div
        className={
          "d-flex flex-row justify-content-between align-items-center mb-5"
        }
      >
        <div className="d-inline-block bg-primary py-2 ps-4 pe-5 rounded-end-5">
          <p className="p-0 m-0 h4">{courseCalendar.title}</p>
        </div>
        {adminIsLogged && (
          <div className="d-flex flex-row justify-content-start align-items-center">
            <AlertModal
              message={`${courseCalendar.title} will be deleted, fine ?`}
              onConfirm={() => {
                handleDeleteCourse(courseCalendar.id);
              }}
              buttonColor="danger"
              confirmText="Delete"
              cancelText="Cancel"
            >
              <Button
                variant={"danger"}
                className="overflow-hidden text-nowrap w-100"
              >
                Delete
              </Button>
            </AlertModal>
          </div>
        )}
      </div>

      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <Table borderless hover>
          <thead>
            <tr>
              <th></th>
              {times.map((time) => (
                <th className="text-center" key={time}>
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              return (
                <tr key={day}>
                    <td style={{ textTransform: "capitalize" }}>{day}</td> 
                    {times.map((time) => {
                      const slot = calendarMap[day]?.[time];
                      return (
                        <td key={time}>
                          {adminIsLogged && (
                            <span
                              className="text-center d-flex flex-row justify-content-center align-items-center"
                              onClick={() =>
                                handleActivateSlot(
                                  slot.id,
                                  slot.status,
                                  fetchCalendar
                                )
                              }
                            >
                              {slot.status ? (
                                <TooltipInformation
                                  tooltipContent={
                                    <div>
                                      {slot?.student_picks.length > 0 ? (
                                        slot?.student_picks.map((item) => (
                                          <div key={item.student.id}>
                                            {item.student.name}
                                          </div>
                                        ))
                                      ) : (
                                        <div>No students</div>
                                      )}
                                    </div>
                                  }
                                >
                                  <Button
                                    disabled={!slot.status}
                                    size="sm"
                                    className={`w-100 ${setColor(
                                      slot.status,
                                      slot.count
                                    )}`}
                                    style={{
                                      maxWidth: "100px",
                                      backgroundColor: setOpacity(
                                        slot.status,
                                        slot.count
                                      ),
                                    }}
                                  >
                                    {slot.count}
                                  </Button>
                                </TooltipInformation>
                              ) : (
                                <Button
                                  className="w-100"
                                  variant="secondary"
                                  size="sm"
                                  style={{ maxWidth: "100px", opacity: "0%" }}
                                >
                                  &nbsp;
                                </Button>
                              )}
                            </span>
                          )}

                          {isUserLoggedIn && (
                            <span className="text-center d-flex flex-row justify-content-center align-items-center">
                              {slot.status ? (
                                <Button
                                  variant={slot.status ? "" : "secondary"}
                                  disabled={!slot.status}
                                  size="sm"
                                  className={`w-100 ${is_selected(slot.student_picks)
                                      ? "btn-success"
                                      : "btn-primary"
                                    }`}
                                  style={{ maxWidth: "100px" }}
                                  onClick={() =>
                                    handleRegisterStudentSlot(
                                      slot.id,
                                      is_selected(slot.student_picks),
                                      fetchCalendar
                                    )
                                  }
                                >
                                  {slot.status ? slot.count : "..."}
                                </Button>
                              ) : (
                                <Button
                                  className="w-100"
                                  variant="secondary"
                                  disabled
                                  size="sm"
                                  style={{ maxWidth: "100px", opacity: "0%" }}
                                >
                                  &nbsp;
                                </Button>
                              )}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
