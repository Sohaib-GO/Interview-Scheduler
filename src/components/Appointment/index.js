import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

// Constants for different visual modes of the component
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode( // useVisualMode is a custom hook 
    props.interview ? SHOW : EMPTY // if there is an interview, show the show component, otherwise show the empty component
  );

  const Save = (name, interviewer) => {
    const interview = { // create an interview object
      student: name,
      interviewer,
    };
    // call saving indicator
    transition(SAVING);
    props
      .bookInterview(props.id, interview) 

      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const deleteInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {/* Render the show component */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition("EDIT")}
          onConfirm={confirmDelete}
        />
      )}
      {/* Render the create form */}
      {mode === "CREATE" && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={Save} />
      )}
      {/* Render the saving indicator */}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {/* Render the confirm view */}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {/* Render the edit form */}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={Save}
        />
      )}
      {/* Render the error message */}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={back} />
      )}
    </article>
  );
}
