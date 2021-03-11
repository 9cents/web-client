import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  Card,
  CardGroup,
  CardHeader,
  CardBody,
} from "shards-react";
import apiProvider from "../utils/apiProvider";
import PageTitle from "../components/common/PageTitle";
import PlayerProgress from "../components/blog/PlayerProgress";

export default function Progress(props) {
  const [playersData, setPlayersData] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState({});
  const [progressData, setProgressData] = React.useState([]);
  const [accuracyData, setAccuracyData] = React.useState([]);

  React.useEffect(() => {
    apiProvider.getPlayers().then((res) => {
      if (res.data.data[0]) {
        setPlayersData(res.data.data);
        setSelectedPlayer(res.data.data[0]);
      }
    });
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(selectedPlayer) !== "{}") {
      apiProvider
        .getProgressData({ player_id: selectedPlayer.player_id })
        .then((res) => {
          setProgressData(res.data.data);
        });
    }
  }, [selectedPlayer]);

  React.useEffect(() => {
    if (JSON.stringify(selectedPlayer) !== "{}") {
      apiProvider
        .getAccuracyData({ player_id: selectedPlayer.player_id })
        .then((res) => {
          if (res.data.data[0]) {
            setAccuracyData(res.data.data[0]);
          }
        });
    }
  }, [selectedPlayer]);

  function handleSelectChange(e) {
    switch (e.target.id) {
      case "player":
        const newPlayer = playersData.find((val) => {
          return val.player_name === e.target.value;
        });
        setSelectedPlayer(newPlayer);
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col>
            <PageTitle
              sm="4"
              title="Progress"
              subtitle="Overview"
              className="text-sm-left"
            />
          </Col>
        </Row>
        {/* Player Select */}
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Player</InputGroupText>
          </InputGroupAddon>
          <FormSelect size="lg" onChange={handleSelectChange} id="player">
            {playersData.map((val) => (
              <option key={val.player_id} value={val.player_name}>
                {val.player_name}
              </option>
            ))}
          </FormSelect>
        </InputGroup>

        <CardGroup>
          <Card small className="mb-4" style={{ width: "45%" }}>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "20%" }}
                    >
                      Tower
                    </th>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "20%" }}
                    >
                      Level
                    </th>
                    <th
                      scope="col"
                      className="border-0"
                      style={{ width: "10%" }}
                    >
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((val) => (
                    <tr>
                      <td>{val.tower_name}</td>
                      <td>
                        {val.level}/{val.total}
                      </td>
                      <td>{val.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card small className="text-center mb-4" style={{ width: "45%" }}>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Overall Performance</h6>
            </CardHeader>
            <PlayerProgress accuracyData={accuracyData} />
          </Card>
        </CardGroup>
      </Container>
    </React.Fragment>
  );
}
