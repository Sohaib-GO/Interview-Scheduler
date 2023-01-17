import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    // call saving indicator
    transition(SAVING)
    props.bookInterview(props.id, interview)

      .then(() => {
        transition(SHOW)
      })

  }

  const confirmDelete = () => {
    transition(CONFIRM)
  }

  const deleteInterview = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }

  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition("EDIT")}
          onConfirm={confirmDelete}
              />
      )}
      {mode === "CREATE" && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={deleteInterview} />}
      {mode === EDIT && ( <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />)}

    </article>
  );
}
