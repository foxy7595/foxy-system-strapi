import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";

import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Button,
} from "@strapi/design-system";
import ChatGPTPrompt from "../ChatGPTPrompt";
import ChatGPTInputPrompt from "../ChatGPTInputPrompt";
import styled from "styled-components";

const Home = () => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Layout>
        <Helmet title={"Strapi ChatGPT"} />
        <Main>
          <HeaderLayout
            title={
              <TitleWraper>
                ChatGPT Suggestion{" "}
                <ButtonChatGPT
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Ask Chat GPT
                </ButtonChatGPT>
              </TitleWraper>
            }
            subtitle={formatMessage({
              id: "chatgpt-suggestion-headder",
              defaultMessage: "ChatGPT Suggestion",
            })}
          />

          <ChatGPTPrompt
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
          <ContentLayout>
            <ChatGPTInputPrompt />
          </ContentLayout>
        </Main>
      </Layout>
    </>
  );
};

const TitleWraper = styled.div`

`;

const ButtonChatGPT = styled(Button)`
    position: absolute ;
    right: 20px;
    top:40px;
`;

export default Home;
