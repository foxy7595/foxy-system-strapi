import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { capitalize } from "lodash";
import BaseEditor from "../BaseEditor";
import Plus from "@strapi/icons/Plus";
import {
  Field,
  FieldHint,
  FieldError,
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Typography,
  Textarea,
  TextInput,
  IconButton,
  Box,
  Button,
} from "@strapi/design-system";

const ChatGPTInput = (props) => {
  const {
    value,
    onChange,
    name,
    intlLabel,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
  } = props;
  const { formatMessage } = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const inputType = useMemo(() => {
    return ["input", "textarea", "editor"].includes(attribute?.options.type);
  }, [attribute]);

  const promptType = useMemo(() => {
    return attribute?.options.chatGPTType;
  }, [attribute]);

  const Input = useMemo(() => {
    return attribute?.options.type === "input" ? TextInput : Textarea;
  }, [attribute]);

  const fieldError = useMemo(() => {
    if (error) return error;
    if (required) {
      if (!inputType) return "Input type is not empty";
      else if (!promptType) {
        return "ChatGPT prompt type is not empty";
      }
    }
    return null;
  }, [required, error, inputType, promptType]);

  if (attribute?.options.type === "editor") return <BaseEditor {...props} />;

  return (
    <Field
      hint={description && formatMessage(description)}
      error={fieldError}
      name={name}
      required={required}
    >
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Title
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Title
            </Typography>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setIsVisible((prev) => !prev)}
                variant="tertiary"
              >
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button variant="secondary">Add new stuff</Button>
                <Button onClick={() => setIsVisible((prev) => !prev)}>
                  Finish
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
      <InputWrapper>
        <OpenPrompt type={attribute?.options.type}>
          <IconButton
            onClick={() => setIsVisible((prev) => !prev)}
            label={<Typography>Open prompt to get data sugguestion</Typography>}
            icon={<Plus />}
          />
        </OpenPrompt>
        <Input
          name={name}
          id={name}
          type="textarea"
          error={!!fieldError}
          disabled={disabled || !promptType || !inputType}
          label={
            <span>
              ChatGPT-
              {capitalize(formatMessage(intlLabel))}
              {required && <Required>*</Required>}
            </span>
          }
          value={value}
          onChange={(e) => {
            onChange({
              target: {
                value: e.target.value,
                name: name,
                type: attribute.type,
              },
            });
          }}
          placeholder={placeholder}
        />
      </InputWrapper>

      <FieldHint />
      <FieldError />
      {/* </Flex> */}
    </Field>
  );
};

ChatGPTInput.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
};

ChatGPTInput.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

const Required = styled.span`
  color: red;
  font-size: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  top: 0;
`;
{
  /* <IconButton onClick={() => setCurrentAction('Create')} label="Create" icon={<Plus />} /> */
}
const OpenPrompt = styled.div`
  position: absolute;
  right: 10px;
  top: ${({ type }) => (type == "input" ? "-16px" : "-12px")};
`;

export default ChatGPTInput;
