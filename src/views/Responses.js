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
  CardBody,
} from "shards-react";
import apiProvider from "../utils/apiProvider";
import PageTitle from "../components/common/PageTitle";

export default function Responses(props) {
  const [playersData, setPlayersData] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState({});
  const [responsesData, setResponsesData] = React.useState([]);

  // upon initial render, get all players information and set initial value to first
  React.useEffect(() => {
    apiProvider.getPlayers().then((res) => {
      if (res.data.data[0]) {
        setPlayersData(res.data.data);
        setSelectedPlayer(res.data.data[0]);
      }
    });
  }, []);

  // when selected player changes, get response data of that player
  React.useEffect(() => {
    // console.log(JSON.stringify(selectedPlayer));
    if (JSON.stringify(selectedPlayer) !== "{}") {
      apiProvider
        .getResponseData({ player_id: selectedPlayer.player_id })
        .then((res) => {
          console.log(res.data.data);
          setResponsesData(res.data.data);
        });
    }
  }, [selectedPlayer]);

  // handles the changing of selected player
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
              title="Responses"
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

        <Card small className="mb-4">
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0" style={{ width: "40%" }}>
                    Question
                  </th>
                  <th scope="col" className="border-0" style={{ width: "40%" }}>
                    Answer
                  </th>
                  <th scope="col" className="border-0" style={{ width: "20%" }}>
                    Correct
                  </th>
                </tr>
              </thead>
              <tbody>
                {responsesData.map((val) => (
                  <tr>
                    <td>{val.question_body}</td>
                    <td>{val.answer_body}</td>
                    <td>{val.correct ? "Correct" : "Wrong"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
}
