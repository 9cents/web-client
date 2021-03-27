import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, CardHeader } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";

import apiProvider from "../utils/apiProvider";

const MAX_ROWS = 5;

const Overview = ({ smallStats }) => {
  const [numPlayers, setNumPlayers] = React.useState(null);
  const [numTowers, setNumTowers] = React.useState(null);
  const [numLevels, setNumLevels] = React.useState(null);
  const [numQuestions, setNumQuestions] = React.useState(null);
  const [numResponses, setNumResponses] = React.useState(null);
  const [questionAccuracy, setQuestionAccuracy] = React.useState(null);
  const statArray = [
    {
      label: "Players",
      value: numPlayers,
    },
    {
      label: "Towers",
      value: numTowers,
    },
    {
      label: "Levels",
      value: numLevels,
    },
    {
      label: "Questions",
      value: numQuestions,
    },
    {
      label: "Responses",
      value: numResponses,
    },
  ];

  React.useEffect(() => {
    apiProvider.getCountPlayers().then((val) => {
      setNumPlayers(val.data.data);
    });
    apiProvider.getCountTowers().then((val) => {
      setNumTowers(val.data.data);
    });
    apiProvider.getCountLevels().then((val) => {
      setNumLevels(val.data.data);
    });
    apiProvider.getCountQuestions().then((val) => {
      setNumQuestions(val.data.data);
    });
    apiProvider.getCountResponses().then((val) => {
      setNumResponses(val.data.data);
    });
    apiProvider.getQuestionAccuracy().then((val) => {
      console.log(val.data);
      setQuestionAccuracy(val.data.data);
    });
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Overview"
          subtitle="Dashboard"
          className="text-sm-left mb-3"
        />
      </Row>

      {/* Small Stats Blocks */}
      <Row>
        {statArray.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              label={stats.label}
              value={stats.value}
            />
          </Col>
        ))}
      </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Card small className="mb-4">
            <CardHeader>
              <h6 className="m-0">Lowest Performance Questions</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "50%" }}
                    >
                      Question
                    </th>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "30%" }}
                    >
                      Tower
                    </th>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "20%" }}
                    >
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questionAccuracy &&
                    questionAccuracy.map((val, idx) => {
                      if (idx < MAX_ROWS) {
                        return (
                          <tr>
                            <td>{val.question_body}</td>
                            <td>{val.tower_name}</td>
                            <td>{val.accuracy.toFixed(2)}%</td>
                          </tr>
                        );
                      } else return null;
                    })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Overview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
};

export default Overview;
