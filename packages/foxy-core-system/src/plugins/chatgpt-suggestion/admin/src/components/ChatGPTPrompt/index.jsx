import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth } from "@strapi/helper-plugin";
import styled from "styled-components";
import {
  Button,
  TextInput,
  Box,
  Card,
  CardBody,
  CardContent,
  Grid,
  GridItem,
  Divider,
} from "@strapi/design-system";
import { PaperPlane } from "@strapi/icons";
import Response from "../Response";
import LoadingOverlay from "../Loading";
import useClickOutside from "../../hooks/useClickOutside";

const ChatGPTPrompt = ({ open, onClose }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const closeDropdown = () => {
    onClose();
  };
  const dropdownRef = useClickOutside(closeDropdown);

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.getToken()}`,
      "Content-Type": "application/json",
    },
  });

  const handleInputChange = (e) => {
    setError(false);
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!content) {
      setError("Prompt is required");
      return;
    }
    setLoading(true);
    const { data } = await instance.post("/chatgpt-suggestion/prompt", {
      prompt: content,
    });
    if (data.error || !data.response) {
      setLoading(false);
      setError(data.error);
      return;
    }

    setResponses([
      ...responses,
      {
        you: content,
        bot: data.response,
      },
    ]);
    setLoading(false);
    setContent("");
  };

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  return (
    <Drawer
      ref={dropdownRef}
      open={open}
      data-open={open.toString()}
      placement="right"
    >
      <CardStyled>
        <CardBodyStyled>
          <CardContent>
            <LoadingOverlay isLoading={loading} />
            <div>
              <StyledContainer>
                {responses.map((response, index) => (
                  <>
                    <Response key={index + "123"} data={response} />
                    <Box paddingTop={2} paddingBottom={4}>
                      <Divider />
                    </Box>
                  </>
                ))}
                <div ref={messagesEndRef} />
              </StyledContainer>
            </div>
          </CardContent>
        </CardBodyStyled>
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid gap={2}>
              <GridItem col={10}>
                <TextInput
                  id="chatInput"
                  placeholder="Enter your prompt here"
                  aria-label="Content"
                  name="content"
                  error={error}
                  onChange={handleInputChange}
                  value={content}
                  disabled={loading}
                  onpaste={(e) => {
                    e.preventDefault();
                    setError(false);
                  }}
                />
              </GridItem>
              <GridItem col={2}>
                <Button
                  fullWidth
                  size="L"
                  startIcon={<PaperPlane />}
                  type="submit"
                  loading={loading}
                >
                  Send
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </CardStyled>
    </Drawer>
  );
};

const Drawer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  height: 100vh;
  width: ${({ open }) => (open ? "600px" : 0)};
  background-color: white;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  border-radius: 6px;
`;

const CardBodyStyled = styled(CardBody)`
  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
`;

const CardStyled = styled(Card)`
  height: 100vh;
  width: 600px;
  overflow: hidden;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  justify-content: flex-end;
`;

export default ChatGPTPrompt;
