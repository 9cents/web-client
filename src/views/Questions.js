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
  Button,
  Card,
  CardHeader,
  Alert,
} from "shards-react";

import apiProvider from "../utils/apiProvider";

import PageTitle from "../components/common/PageTitle";

const Questions = () => {
  const [selectedWorld, setSelectedWorld] = React.useState({});
  const [worldsData, setWorldsData] = React.useState([]);
  const [selectedTower, setSelectedTower] = React.useState({});
  const [towersData, setTowersData] = React.useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState({});
  const [levelsData, setLevelsData] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState({});
  const [questionsData, setQuestionsData] = React.useState([]);
  const [answersData, setAnswersData] = React.useState([]);
  const [copyAnswersData, setCopyAnswersData] = React.useState([]);
  const [updateSuccess, setUpdateSuccess] = React.useState(null);

  React.useEffect(() => {
    // get worlds data
    apiProvider.getWorlds().then((res) => {
      if (res.data.data[0]) {
        setWorldsData(res.data.data);
        setSelectedWorld(res.data.data[0]);
      }
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(selectedWorld) === "{}") {
      return;
    }
    apiProvider.getTowers({ world_id: selectedWorld.world_id }).then((res) => {
      const data = res.data;
      setTowersData(data.data);
      setSelectedTower(data.data[0]);
    });
  }, [selectedWorld]);

  React.useEffect(() => {
    if (JSON.stringify(selectedTower) === "{}") {
      return;
    }
    apiProvider.getLevels({ tower_id: selectedTower.tower_id }).then((res) => {
      const data = res.data;
      setLevelsData(data.data);
      setSelectedLevel(data.data[0]);
    });
  }, [selectedTower]);

  React.useEffect(() => {
    if (JSON.stringify(selectedLevel) === "{}") {
      return;
    }
    apiProvider
      .getQuestions({ level_id: selectedLevel.level_id })
      .then((res) => {
        const data = res.data;
        setQuestionsData(data.data);
        setSelectedQuestion(data.data[0]);
      });
  }, [selectedLevel]);

  // get updated questions
  React.useEffect(() => {
    if (JSON.stringify(selectedQuestion) === "{}") {
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
  }, [selectedQuestion]);

  // success notification bar
  React.useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 5000);
    }
  }, [updateSuccess]);

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
        break;
      default:
        break;
    }
  }

  function updateAnswers() {
    var promiseArr = copyAnswersData.map((ans) => {
      const conditions = {
        answer_id: ans.answer_id,
      };
      const data = {
        ...ans,
        conditions,
      };
      delete data["answer_id"];
      return apiProvider.updateAnswer(data);
    });
    Promise.all(promiseArr).then((values) => {
      setUpdateSuccess(true);
      setAnswersData(JSON.parse(JSON.stringify(copyAnswersData)));
    });
  }

  return (
    <React.Fragment>
      <Container fluid className="px-0">
        {updateSuccess && (
          <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Answers successfully updated.
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
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="question">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        <Card className="mb-4">
          <CardHeader className="border-bottom">
            <Row
              className="px-4"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <h6 className="m-0">Answers (Correct answer is checked)</h6>
              <Button
                disabled={
                  JSON.stringify(answersData) ===
                  JSON.stringify(copyAnswersData)
                }
                onClick={updateAnswers}
              >
                Update
              </Button>
            </Row>
          </CardHeader>
          <Col sm="12" className="mb-3 mt-3">
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
          </Col>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Questions;
