const  getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter((days) => days.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map(
    (appointment) => state.appointments[appointment]
  );
  return filteredAppointments;
}



const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
};


module.exports = { getAppointmentsForDay, getInterview };