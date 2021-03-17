import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Badge,
  } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const Intructions = () => {
    const InstructionProgress = `
    In the Progress tab, you will be able to view your students' overall progress in 
    their mastery of the subject. In the progress tab, you can select the student you want to view
    the progress on. The system will automatically show the student's scores in each Tower, Level and 
    their accuracy in terms of correct answers over total answers. You can also see this data in a visual
    pie chart.
    `;

    const InstructionQuestions = `
    In the Questions tab, you can select the questions you want your students to complete in the game.
    You can specify exactly which World, Tower and Level you want the question to be in. Once you select
    the question, you can also select the correct answer for that question to update the system.
    You can also add new questions to your liking in this tab. Simply type in your new question in the 
    text field and select the correct answer to update the system.
    `;

    const InstructionResponses = `
    In the Responses tab, you can view the individual responses of each student playing the game. You can select
    the particular student you want to monitor and see their answers for each question and if they had gotten
    it correct.
    `;

    const InstructionAssignments = `
    In the Assignments tab, you can select the questions you would like to test your students, and package it
    into an assignment. If you want to add a different question, you can go to the Questions tab to add a new
    question. Once you have selected the 5 questions you would like to ask your students, you can simply click
    "Update". This will package the questions into an assignment and will appear in the student's dekstop game
    as a "dungeon". Students can then enter the dungeon to complete your assignment.
    You can also notify your students about the release of a new assignment by clicking on the "Send" button.
    You can choose to notify your students through 2 social medias: Twitter and Facebook.
    `;
    const InstructionCards = [
        {
          category: "Business",
          categoryTheme: "dark",
          title:
            "Progress",
          body:
            InstructionProgress,
        },
        {
            category: "Business",
            categoryTheme: "dark",
            title:
              "Questions",
            body:
              InstructionQuestions,
          },
          {
            category: "Business",
            categoryTheme: "dark",
            title:
              "Responses",
            body:
              InstructionResponses,
          },
          {
            category: "Business",
            categoryTheme: "dark",
            title:
              "Assignments",
            body:
              InstructionAssignments,
          }
    ];
    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Instructions" subtitle="Instructor Interface" className="text-sm-left" />
            </Row>
            
            <Row>
            {InstructionCards.map((post, idx) => (
                <Col lg="12" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--aside card-post--1">
                    <CardBody>
                    <h5 className="card-title">
                        {post.title}
                    </h5>
                    <p className="card-text d-inline-block mb-3">{post.body}</p>
                    <span className="text-muted">{post.date}</span>
                    </CardBody>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
    );
};

export default Intructions;