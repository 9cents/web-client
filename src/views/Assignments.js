import React from "react";
import {
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  Button,
  Alert,
  FormCheckbox,
} from "shards-react";

import apiProvider from "../utils/apiProvider";

import PageTitle from "../components/common/PageTitle";
import SocialMedia from "./SocialMedia";

const Assignments = () => {
  const [questionsData, setQuestionsData] = React.useState([]);
  const [selectedInstructor, setSelectedInstructor] = React.useState({});
  const [updateSuccess, setUpdateSuccess] = React.useState(null);
  const [valuesChanged, setValuesChanged] = React.useState(false);
  const [question1, setQuestion1] = React.useState({});
  const [question2, setQuestion2] = React.useState({});
  const [question3, setQuestion3] = React.useState({});
  const [question4, setQuestion4] = React.useState({});
  const [question5, setQuestion5] = React.useState({});
  const questionArray = [question1, question2, question3, question4, question5];
  const [dungeonLocked, setDungeonLocked] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    apiProvider.getInstructors().then((res) => {
      const data = res.data;
      setSelectedInstructor(data.data[0]);
    });
    apiProvider.getQuestions().then((res) => {
      setQuestionsData(res.data.data);
    });
  }, []);

  React.useEffect(() => {
    if (selectedInstructor.question_1) {
      setQuestion1(
        questionsData.find((val) => {
          return val.question_id === selectedInstructor.question_1;
        })
      );
    }
    if (selectedInstructor.question_2) {
      setQuestion2(
        questionsData.find((val) => {
          return val.question_id === selectedInstructor.question_2;
        })
      );
    }
    if (selectedInstructor.question_3) {
      setQuestion3(
        questionsData.find((val) => {
          return val.question_id === selectedInstructor.question_3;
        })
      );
    }
    if (selectedInstructor.question_4) {
      setQuestion4(
        questionsData.find((val) => {
          return val.question_id === selectedInstructor.question_4;
        })
      );
    }
    if (selectedInstructor.question_5) {
      setQuestion5(
        questionsData.find((val) => {
          return val.question_id === selectedInstructor.question_5;
        })
      );
    }
    if (selectedInstructor.lock) {
      setDungeonLocked(selectedInstructor.lock);
    }
  }, [selectedInstructor, questionsData]);

  // success notification bar
  React.useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 5000);
    }
  }, [updateSuccess]);

  // check if question values are different from original instructor's questions
  React.useEffect(() => {
    try {
      if (
        selectedInstructor.question_1 !== question1.question_id ||
        selectedInstructor.question_2 !== question2.question_id ||
        selectedInstructor.question_3 !== question3.question_id ||
        selectedInstructor.question_4 !== question4.question_id ||
        selectedInstructor.question_5 !== question5.question_id ||
        selectedInstructor.lock !== dungeonLocked
      ) {
        setValuesChanged(true);
      } else {
        setValuesChanged(false);
      }
    } catch (e) {
      console.log(e);
    }

    // eslint-disable-next-line
  }, [selectedInstructor, question1, question2, question3, question4, question5, dungeonLocked]);

  function handleSelectChange(e) {
    switch (e.target.id) {
      case "q1":
        setQuestion1(
          questionsData.find((val) => {
            return val.question_body === e.target.value;
          })
        );
        break;
      case "q2":
        setQuestion2(
          questionsData.find((val) => {
            return val.question_body === e.target.value;
          })
        );
        break;
      case "q3":
        setQuestion3(
          questionsData.find((val) => {
            return val.question_body === e.target.value;
          })
        );
        break;
      case "q4":
        setQuestion4(
          questionsData.find((val) => {
            return val.question_body === e.target.value;
          })
        );
        break;
      case "q5":
        setQuestion5(
          questionsData.find((val) => {
            return val.question_body === e.target.value;
          })
        );
        break;
      default:
        break;
    }
  }

  function handleLockedCheckbox(e) {
    setDungeonLocked((prev) => !prev);
  }

  function updateDungeons() {
    const conditions = {
      instructor_id: selectedInstructor.instructor_id,
    };
    const data = {
      question_1: question1.question_id,
      question_2: question2.question_id,
      question_3: question3.question_id,
      question_4: question4.question_id,
      question_5: question5.question_id,
      lock: dungeonLocked,
      conditions,
    };
    apiProvider.updateInstructor(data).then((val) => {
      setUpdateSuccess(true);
      apiProvider.getInstructors().then((res) => {
        const data = res.data;
        setSelectedInstructor(data.data[0]);
      });
    });
  }

  return (
    <React.Fragment>
      <Container fluid className="px-0">
        {updateSuccess && (
          <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Dungeons successfully updated.
          </Alert>
        )}
      </Container>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Assignments"
            subtitle="Special Tower"
            className="text-sm-left"
          />
        </Row>

        {questionArray.map((questionState, idx) => {
          return (
            <InputGroup className="mb-3" key={idx}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Question {`#${idx + 1}`}</InputGroupText>
              </InputGroupAddon>
              <FormSelect
                size="lg"
                onChange={handleSelectChange}
                id={`q${idx + 1}`}
                value={questionState && questionState.question_body}
              >
                <option>Select a question</option>
                {questionsData
                  .filter((val) => {
                    if (JSON.stringify(val) === JSON.stringify(questionState)) {
                      return true;
                    } else if (
                      questionArray.reduce((accum, curr) => {
                        return (
                          accum || JSON.stringify(curr) === JSON.stringify(val)
                        );
                      }, false)
                    ) {
                      return false;
                    } else return true;
                  })
                  .map((val) => {
                    return (
                      <option key={val.question_id} value={val.question_body}>
                        {val.question_body}
                      </option>
                    );
                  })}
              </FormSelect>
            </InputGroup>
          );
        })}
        <FormCheckbox
          className="mb-3"
          checked={dungeonLocked}
          onChange={handleLockedCheckbox}
        >
          Locked
        </FormCheckbox>

        <Button className="float-right"
          disabled={
            // check for duplicates
            questionArray.length !==
              new Set(questionArray.map((val) => JSON.stringify(val))).size ||
            // make sure all questions have values
            questionArray.reduce((accum, curr) => {
              return accum || !curr || JSON.stringify(curr) === "{}";
            }, false) ||
            // check that selected questions are different from original values
            !valuesChanged
          }
          onClick={updateDungeons}
        >
          Update
        </Button>
        <Button className="btn-success" onClick={() => setModalShow(true)}>
          Send
        </Button>
        <SocialMedia show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </React.Fragment>
  );
};

export default Assignments;
