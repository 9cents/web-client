import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import apiProvider from "../utils/apiProvider";

import PageTitle from "../components/common/PageTitle";

const Questions = () => {
  const [questionsData, setQuestionsData] = React.useState([]);

  React.useEffect(() => {
    // get questions data
    apiProvider.getAllQuestions().then((res) => {
      const data = res.data;
      setQuestionsData(data.data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Questions"
          subtitle="Game Data"
          className="text-sm-left"
        />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Questions</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "3rem", textAlign: "center" }}
                    >
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Question
                    </th>
                    {/* <th scope="col" className="border-0">
                      Last Name
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {questionsData.map((qns) => (
                    <tr key={qns.question_id}>
                      <td style={{ textAlign: "center" }}>{qns.question_id}</td>
                      <td>{qns.question_body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Questions;
