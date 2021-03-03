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

const Dungeons = () => {
    const [questionsData, setQuestionsData] = React.useState([]);
    const [selectedQuestions, setSelectedQuestions] = React.useState({});
    const [updateSuccess, setUpdateSuccess] = React.useState(null);

  React.useEffect(() => {
    apiProvider
      .getDungeonQuestions({ instructor_id: 1 })
      .then((res) => {
        const data = res.data;
        console.log(data.data)
        setSelectedQuestions(data.data[0]);
      });
  }, []);

  // This would initiate the selected Instructor
  React.useEffect(() => {
    if (JSON.stringify(selectedQuestions) === "{}") {
      return;
    }
    apiProvider.getUniqueQuestions({
      question_1: selectedQuestions.question_1,
      question_2: selectedQuestions.question_2,
      question_3: selectedQuestions.question_3,
      question_4: selectedQuestions.question_4,
      question_5: selectedQuestions.question_5
    }).then((res) => {
      const data = res.data;
      console.log(data.data)
      setQuestionsData(data.data);
    });
    // eslint-disable-next-line
  }, [selectedQuestions]);

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
      case "q1":
        this.setState({
          selectedQuestions: e.target.value
        });
        setQuestionsData(selectedQuestions);
        break;
      case "q2":
        this.setState({
          selectedQuestions: e.target.value
        });
        setQuestionsData(selectedQuestions);
        break;
      case "q3":
        this.setState({
          selectedQuestions: e.target.value
        });
        setQuestionsData(selectedQuestions);
        break;
      case "q4":
        this.setState({
          selectedQuestions: e.target.value
        });
        setQuestionsData(selectedQuestions);
        break;
      case "q5":
        this.setState({
          selectedQuestions: e.target.value
        });
        setQuestionsData(selectedQuestions);
        break;
      default:
        break;
    }
  }

  function updateDungeons() {
    var promiseArr = questionsData.map((ans) => {
      const conditions = {
        instructor_id: 1,
      };
      const data = {
        ...ans,
        conditions,
      };
      return apiProvider.updateDungeon(data);
    });
    Promise.all(promiseArr).then((values) => {
      setUpdateSuccess(true);
      setQuestionsData(JSON.parse(JSON.stringify(questionsData)));
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
            title="Dungeons"
            subtitle="Special Tower"
            className="text-sm-left"
          />
        </Row>

        {/* Question 1 Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question #1</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="q1">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Question 2 Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question #2</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="q2">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Question 3 Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question #3</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="q3">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Question 4 Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question #4</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="q4">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        {/* Question 5 Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Question #5</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="q5">
            {questionsData.map((val) => (
              <option key={val.question_id} value={val.question_body}>
                {val.question_body}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        <CardHeader className="border-bottom">
            <Button classname = "pr-4"
            /*disabled={
                JSON.stringify(instructorsData) ===
                JSON.stringify(copyInstructorsData)
            }*/
            onClick={updateDungeons}
            >
            Update
            </Button>
        </CardHeader>
      </Container>
    </React.Fragment>
  );
};

export default Dungeons;
