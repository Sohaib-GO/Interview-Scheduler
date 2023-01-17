import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // update the current day in the state
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        // Update the days property in state with the data received from the first axios request
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    // create a new appointment object with the interview set to the interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // update the appointments object in state
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      // update the database
      setState({
        ...state,
        appointments,
      });
    });
  }

  const cancelInterview = (id) => {
    // create a new appointment object with the interview set to null
    const appointment = {
      ...state.appointments[id], // get the appointment
      interview: null,
    };

    // update the appointments object in state
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
