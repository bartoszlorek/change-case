import * as React from 'react';
import styled from 'styled-components';

import mark from './mark';
import Wrap from './Wrap';

const Description = styled.p`
  margin: 0 0 1em;
  line-height: 1.5em;
`;

const Section = ({title, description, children}) => {
  const showDescription = !!(title || description);

  return (
    <Wrap>
      {showDescription && (
        <Description>
          {title && <b>{title}: </b>}
          {mark(description)}
        </Description>
      )}

      {children}
    </Wrap>
  );
};

export default Section;
