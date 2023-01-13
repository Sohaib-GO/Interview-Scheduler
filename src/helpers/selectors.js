export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((days) => days.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map(
    (appointment) => state.appointments[appointment]
  );
  return filteredAppointments;
}
