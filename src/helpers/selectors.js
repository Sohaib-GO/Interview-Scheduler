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

const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter((stateDay) => stateDay.name === day);

  if (filteredDays.length === 0) return [];

  const interviewersArr = filteredDays[0].interviewers.map((id) => {
    return state.interviewers[id];
  });
  return interviewersArr;
};




module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };

