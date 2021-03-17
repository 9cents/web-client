import React from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  FormRadio,
  FormInput,
  FormTextarea,
  Button,
  Card,
  CardHeader,
  Alert,
  CardBody,
  CardTitle,
} from "shards-react";

import apiProvider from "../utils/apiProvider";

import PageTitle from "../components/common/PageTitle";

const Questions = () => {
  const [selectedWorld, setSelectedWorld] = React.useState(null);
  const [worldsData, setWorldsData] = React.useState([]);
  const [selectedTower, setSelectedTower] = React.useState(null);
  const [towersData, setTowersData] = React.useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState(null);
  const [levelsData, setLevelsData] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [questionsData, setQuestionsData] = React.useState([]);
  const [copySelectedQuestion, setCopySelectedQuestion] = React.useState(null);
  const [answersData, setAnswersData] = React.useState([]);
  const [copyAnswersData, setCopyAnswersData] = React.useState([]);
  const [updateSuccess, setUpdateSuccess] = React.useState(null);
  const [isCreateNew, setIsCreateNew] = React.useState(true);
  const [isValidNewData, setIsValidNewData] = React.useState(false);

  // upon render, get world data and select the first world
  React.useEffect(() => {
    apiProvider.getWorlds().then((res) => {
      if (res.data.data[0]) {
        setWorldsData(res.data.data);
        setSelectedWorld(res.data.data[0]);
      }
    });
    // eslint-disable-next-line
  }, []);

  // when selected world changes, get the new tower data for that world
  React.useEffect(() => {
    if (!selectedWorld) {
      setTowersData([]);
      setSelectedTower(null);
      return;
    }
    apiProvider.getTowers({ world_id: selectedWorld.world_id }).then((res) => {
      const data = res.data;
      setTowersData(data.data);
      setSelectedTower(data.data[0]);
    });
  }, [selectedWorld]);

  // when selected tower changes, get the new level data for that tower
  React.useEffect(() => {
    if (!selectedTower) {
      setLevelsData([]);
      setSelectedLevel(null);
      return;
    }
    apiProvider.getLevels({ tower_id: selectedTower.tower_id }).then((res) => {
      const data = res.data;
      setLevelsData(data.data);
      setSelectedLevel(data.data[0]);
    });
  }, [selectedTower]);

  // when selected level changes, get the new questions data for that level
  React.useEffect(() => {
    if (!selectedLevel) {
      setQuestionsData([]);
      setSelectedQuestion(null);
      return;
    }
    apiProvider
      .getQuestions({ level_id: selectedLevel.level_id })
      .then((res) => {
        const data = res.data;
        setQuestionsData(data.data);
        setSelectedQuestion(data.data[0]);
        setIsCreateNew(true);
      });
  }, [selectedLevel]);

  // when selected question changes, get the answers related to that question
  React.useEffect(() => {
    if (isCreateNew) {
      var template = {
        answer_body: "",
        correct: false,
      };
      setCopyAnswersData([
        JSON.parse(JSON.stringify(template)),
        JSON.parse(JSON.stringify(template)),
        JSON.parse(JSON.stringify(template)),
        JSON.parse(JSON.stringify(template)),
      ]);
      setCopySelectedQuestion({ question_body: "" });
      return;
    }

    setCopySelectedQuestion(selectedQuestion);

    if (!selectedQuestion) {
      setAnswersData([]);
      setCopyAnswersData([]);
      return;
    }
    apiProvider
      .getAnswers({ question_id: selectedQuestion.question_id })
      .then((res) => {
        const data = res.data.data;
        data.sort((a, b) => {
          return a.answer_id - b.answer_id;
        });
        setAnswersData(JSON.parse(JSON.stringify(data)));
        setCopyAnswersData(JSON.parse(JSON.stringify(data)));
      });
  }, [selectedQuestion, isCreateNew]);

  // success notification bar to show up for X seconds when updateSuccess is true
  React.useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 8000);
    }
  }, [updateSuccess]);

  // handle form select
  function handleSelectChange(e) {
    switch (e.target.id) {
      case "world":
        const newWorld = worldsData.find((val) => {
          return val.world_name === e.target.value;
        });
        setSelectedWorld(newWorld);
        break;
      case "tower":
        const newTower = towersData.find((val) => {
          return val.tower_name === e.target.value;
        });
        setSelectedTower(newTower);
        break;
      case "level":
        const newLevel = levelsData.find((val) => {
          return val.level_name === e.target.value;
        });
        setSelectedLevel(newLevel);
        break;
      case "question":
        const newQuestion = questionsData.find((val) => {
          return val.question_body === e.target.value;
        });
        setSelectedQuestion(newQuestion);
        if (!newQuestion) {
          setIsCreateNew(true);
        } else {
          setIsCreateNew(false);
        }
        break;
      default:
        break;
    }
  }

  // send updated question & answers to backend to be updated
  function updateQuestionAndAnswers() {
    // for updating answers
    var promiseArr = copyAnswersData.map((ans, idx) => {
      if (JSON.stringify(ans) !== JSON.stringify(answersData[idx])) {
        const conditions = {
          answer_id: ans.answer_id,
        };
        const data = {
          ...ans,
          conditions,
        };
        delete data["answer_id"];
        return apiProvider.updateAnswer(data);
      } else {
        return true;
      }
    });

    // for updating questions
    if (
      JSON.stringify(selectedQuestion) !== JSON.stringify(copySelectedQuestion)
    ) {
      const conditions = {
        question_id: copySelectedQuestion.question_id,
      };
      const data = {
        ...copySelectedQuestion,
        conditions,
      };
      delete data["question_id"];
      promiseArr.push(apiProvider.updateQuestion(data));
    }

    // once all done
    Promise.all(promiseArr).then((values) => {
      setUpdateSuccess(true);
      setAnswersData(JSON.parse(JSON.stringify(copyAnswersData)));
      setQuestionsData((prev) => {
        var temp = JSON.parse(JSON.stringify(prev));
        temp = temp.map((val, idx) => {
          if (val.question_id === copySelectedQuestion.question_id) {
            return copySelectedQuestion;
          } else return val;
        });
        return temp;
      });
      setSelectedQuestion(JSON.parse(JSON.stringify(copySelectedQuestion)));
    });
  }

  // send new question to backend
  async function createNewQuestionAndAnswers() {
    const data = {
      ...copySelectedQuestion,
      level_id: selectedLevel.level_id,
    };
    await apiProvider.updateQuestion(data);
    apiProvider
      .getQuestions({
        question_body: copySelectedQuestion.question_body,
      })
      .then((res) => {
        var qnsObj = res.data.data[0];
        console.log(qnsObj);

        var promiseArr = copyAnswersData.map((ans, idx) => {
          const data = {
            ...ans,
            question_id: qnsObj.question_id,
          };
          return apiProvider.updateAnswer(data);
        });
        Promise.all(promiseArr).then((values) => {
          setUpdateSuccess(true);
          setAnswersData(JSON.parse(JSON.stringify(copyAnswersData)));
          setQuestionsData((prev) => {
            var temp = JSON.parse(JSON.stringify(prev));
            temp.push(qnsObj);
            return temp;
          });
          setSelectedQuestion(JSON.parse(JSON.stringify(qnsObj)));
        });
      });
  }

  // new question and answer validation
  React.useEffect(() => {
    if (isCreateNew && copySelectedQuestion) {
      // check if question body has text
      if (copySelectedQuestion.question_body.trim() === "") {
        setIsValidNewData(false);
        return;
      }
      // check if all answers have text
      if (
        copyAnswersData.reduce((prev, curr) => {
          return curr.answer_body.trim() === "" || prev;
        }, false)
      ) {
        setIsValidNewData(false);
        return;
      }
      // check if one answer is selected as correct answer
      if (
        copyAnswersData.reduce((prev, curr) => {
          return !curr.correct && prev;
        }, true)
      ) {
        setIsValidNewData(false);
        return;
      }
      // if passes all checks above, set to true to un-disable button
      setIsValidNewData(true);
    } else setIsValidNewData(true);
  }, [copyAnswersData, copySelectedQuestion, isCreateNew]);

  return (
    <React.Fragment>
      <Container fluid className="px-0">
        {updateSuccess && (
          <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i>{" "}
            {"Question and Answers successfully " +
              (isCreateNew ? "created" : "updated.")}
          </Alert>
        )}
      </Container>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col>
            <PageTitle
              sm="4"
              title="Questions"
              subtitle="Game Data"
              className="text-sm-left"
            />
          </Col>
        </Row>

        {/* World Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>World</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="world">
            {worldsData.map((val) => (
              <option key={val.world_id} value={val.world_name}>
                {val.world_name}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Tower Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Tower</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="tower">
            {towersData.map((val) => (
              <option key={val.tower_id} value={val.tower_name}>
                {val.tower_name}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Level Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Level</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="level">
            {levelsData.map((val) => (
              <option key={val.level_id} value={val.level_name}>
                {val.level_name}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Question Select */}
        <InputGroup className="mb-4">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="question">
            {selectedLevel && (
              <option value={"Create New Question..."}>
                Create New Question...
              </option>
            )}
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        <Card>
          <CardHeader className="border-bottom">
            <Row
              className="px-4"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <h6 className="m-0">
                {(isCreateNew ? "Create New" : "Edit") +
                  " Question and Answers (Correct answer is checked)"}
              </h6>
              <Button
                disabled={
                  (JSON.stringify(answersData) ===
                    JSON.stringify(copyAnswersData) &&
                    JSON.stringify(selectedQuestion) ===
                      JSON.stringify(copySelectedQuestion)) ||
                  !isValidNewData
                }
                onClick={
                  isCreateNew
                    ? createNewQuestionAndAnswers
                    : updateQuestionAndAnswers
                }
              >
                {isCreateNew ? "Create" : "Update"}
              </Button>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <CardTitle className="px-4 pb-4 pt-0" style={{ width: "100%" }}>
                {copySelectedQuestion && (
                  <FormTextarea
                    style={{ maxWidth: "60%" }}
                    value={
                      copySelectedQuestion
                        ? copySelectedQuestion.question_body
                        : ""
                    }
                    onChange={(e) => {
                      e.persist();
                      setCopySelectedQuestion((p) => {
                        var t = JSON.parse(JSON.stringify(p));
                        t.question_body = e.target.value;
                        return t;
                      });
                    }}
                  />
                )}
              </CardTitle>
            </Row>
            {copyAnswersData.map((val, idx) => (
              <Row
                key={val.answer_id}
                className="px-4 pb-2"
                style={{ alignItems: "center" }}
              >
                <FormRadio
                  inline
                  checked={val.correct}
                  onChange={(e) => {
                    setCopyAnswersData((prev) => {
                      var temp = [...prev].map((val) => {
                        val.correct = false;
                        return val;
                      });
                      temp[idx].correct = true;
                      return temp;
                    });
                  }}
                ></FormRadio>
                <FormInput
                  className="mb-2"
                  style={{ maxWidth: "50%" }}
                  onChange={(e) => {
                    var newValue = e.target.value;
                    setCopyAnswersData((prev) => {
                      var temp = [...prev];
                      temp[idx].answer_body = newValue;
                      return temp;
                    });
                  }}
                  value={val.answer_body}
                />
              </Row>
            ))}
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Questions;
