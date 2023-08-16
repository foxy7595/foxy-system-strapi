import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth, ReactSelect } from "@strapi/helper-plugin";
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
import LoadingOverlay from "../Loading";

const ChatGPTInputPrompt = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <CardStyled>
      <CardBodyStyled>
        <CardContent>
          <LoadingOverlay isLoading={loading} />

          <ReactSelect />
        </CardContent>
      </CardBodyStyled>
    </CardStyled>
  );
};

const CardBodyStyled = styled(CardBody)``;

const CardStyled = styled(Card)``;

export default ChatGPTInputPrompt;
