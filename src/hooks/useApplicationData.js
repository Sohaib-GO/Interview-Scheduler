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

  // update the number of spots for the current day
  const updateSpots = (day, days, appointments) => {
    // find the day object in the days array
    const dayObj = days.find((d) => d.name === day);
    let spots = 0;

    for (const id of dayObj.appointments) {
      // get the appointment object from the appointments object
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

  function bookInterview(id, interview) {
    // create a new appointment object with the interview set to the interview object
    const appointment = {
      ...state.appointments[id], // get the appointment
      interview: { ...interview },
    };

    // update the appointments object in state
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // update the number of spots for the current day
    const spots = updateSpots(state.day, state.days, appointments);
    // update the days object in state
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots };
      }
      return day;
    });

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
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

    // update the number of spots for the current day
    const spots = updateSpots(state.day, state.days, appointments);

    // update the days object in state
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots };
      }
      return day;
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
};

export default useApplicationData;
