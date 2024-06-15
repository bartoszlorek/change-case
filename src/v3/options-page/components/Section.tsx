import * as React from 'react';
import styled from 'styled-components';
import Wrap from './Wrap';

const Description = styled.p`
  margin: 0 0 1em;
  line-height: 1.5em;
`;

type PropsType = Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>;

const Section = ({title, description, children}: PropsType) => {
  const showDescription = !!(title || description);

  return (
    <Wrap>
      {showDescription && (
        <Description>
          {title && <b>{title}: </b>}
          {description}
        </Description>
      )}
      {children}
    </Wrap>
  );
};

export default Section;
