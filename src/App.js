import React, { useState, useEffect, useCallback } from "react";
import Button from "./components/Button";
import Text from "./components/Text";
import Title from "./components/Title";
import Card from "./components/Card";
import Section from "./components/Section";
import HeaderSection from "./components/HeaderSection";
import Avatar from "./components/Avatar";
import styled from "styled-components";
import List from "./components/List";
import ListItem from "./components/ListItem";
import GlobalStyle from "./styles/GlobalStyle";
import {
  handleAuthClick,
  getDayOfTheWeek,
  getAssigneesForChore
} from "./utilities";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChoreSection = styled(Section)`
  padding: 0;
  align-content: flex-start;
`;

function App() {
  const [isSignedIn, setIsSignedin] = useState(false);
  const [chores, setChores] = useState([]);

  const onClickGetData = useCallback(() => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: SPREADSHEET_ID,
        range: getDayOfTheWeek() + "!A1:N"
      })

      .then(response => {
        const [chores, ...assignments] = response.result.values;
        const chorelist = [];

        chores.forEach(function(chore, index) {
          if (chore === "") return; // if not true -> return to loop
          chorelist.push({
            name: chore,
            assignees: getAssigneesForChore(assignments, index)
          });
        });
        setChores(chorelist);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
        .then(
          function() {
            // Listen for sign-in state changes.
            window.gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(isSignedIn => {
                setIsSignedin(isSignedIn);
              });
            // Handle the initial sign-in state.
            setIsSignedin(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            onClickGetData();
          },
          function(error) {
            console.log("error", error);
          }
        );
    });
  }, [onClickGetData]);

  return (
    <Section>
      <GlobalStyle />
      <HeaderSection>
        <Title>{getDayOfTheWeek()}</Title>
        {!isSignedIn && <Button onClick={handleAuthClick}>Sign in</Button>}
      </HeaderSection>
      <ChoreSection>
        {chores.map(({ name, assignees }) => {
          return (
            <Card key={name}>
              <CardContent>
                <Text>{name}</Text>
                <List>
                  {assignees.map((assignee, i) => (
                    <ListItem key={i}>
                      <Avatar src={`/img/${assignee}.jpg`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          );
        })}
      </ChoreSection>
    </Section>
  );
}

export default App;
