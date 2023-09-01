import React from 'react';

import { Box } from '@strapi/design-system';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';
import styled, { useTheme } from 'styled-components';

const FoxyCreatable = ({ components, styles, error, ariaErrorMessage, ...props }) => {
  const theme = useTheme();
  const customStyles = getSelectStyles(theme, error);

  return (
    <Creatable
      aria-errormessage={error && ariaErrorMessage}
      aria-invalid={!!error}
      styles={{ ...customStyles, ...styles }}
      {...props}
    />
  );
};

FoxyCreatable.defaultProps = {
  ariaErrorMessage: undefined,
  components: undefined,
  error: undefined,
  styles: undefined,
  options: [],
};

FoxyCreatable.propTypes = {
  ariaErrorMessage: PropTypes.string,
  components: PropTypes.object,
  error: PropTypes.string,
  styles: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const IconBox = styled(Box)`
  background: transparent;
  border: none;
  position: relative;
  z-index: 1;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

const getSelectStyles = (theme, error) => {
  return {
    container: (base) => ({
      ...base,
      background: theme.colors.neutral0,
      lineHeight: 'normal',
    }),
    control(base, state) {
      let borderColor = theme.colors.neutral200;
      let boxShadowColor;
      let backgroundColor;

      if (state.isFocused) {
        borderColor = theme.colors.primary600;
        boxShadowColor = theme.colors.primary600;
      } else if (error) {
        borderColor = theme.colors.danger600;
      }

      if (state.isDisabled) {
        backgroundColor = `${theme.colors.neutral150} !important`;
      }

      return {
        ...base,
        fontSize: theme.fontSizes[2],
        height: 40,
        border: `1px solid ${borderColor} !important`,
        outline: 0,
        backgroundColor,
        borderRadius: theme.borderRadius,
        boxShadow: boxShadowColor ? `${boxShadowColor} 0px 0px 0px 2px` : 0,
      };
    },
    indicatorContainer: (base) => ({ ...base, padding: 0, paddingRight: theme.spaces[3] }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: theme.colors.neutral800,
      gridTemplateColumns: '0 100%',
    }),
    menu(base) {
      return {
        ...base,
        width: '100%',
        marginTop: theme.spaces[1],
        backgroundColor: theme.colors.neutral0,
        color: theme.colors.neutral800,
        borderRadius: theme.borderRadius,
        border: `1px solid ${theme.colors.neutral200}`,
        boxShadow: theme.shadows.tableShadow,
        fontSize: theme.fontSizes[2],
        zIndex: 2,
      };
    },
    menuList: (base) => ({
      ...base,
      paddingLeft: theme.spaces[1],
      paddingTop: theme.spaces[1],
      paddingRight: theme.spaces[1],
      paddingBottom: theme.spaces[1],
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 100,
    }),
    option(base, state) {
      let backgroundColor = base.backgroundColor;

      if (state.isFocused || state.isSelected) {
        backgroundColor = theme.colors.primary100;
      }

      return {
        ...base,
        color: theme.colors.neutral800,
        lineHeight: theme.spaces[5],
        backgroundColor,
        borderRadius: theme.borderRadius,
        '&:active': {
          backgroundColor: theme.colors.primary100,
        },
      };
    },
    placeholder: (base) => ({
      ...base,
      color: theme.colors.neutral600,
      marginLeft: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '80%',
    }),
    singleValue(base, state) {
      let color = theme.colors.neutral800;

      if (state.isDisabled) {
        color = theme.colors.neutral600;
      }

      return { ...base, marginLeft: 0, color };
    },
    valueContainer: (base) => ({
      ...base,
      cursor: 'pointer',
      padding: 0,
      paddingLeft: theme.spaces[4],
      marginLeft: 0,
      marginRight: 0,
    }),
  };
};

export { FoxyCreatable };
