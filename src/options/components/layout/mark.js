import * as React from 'react';
import styled from 'styled-components';
import applyMarkdown from '@utils/apply-markdown';

const Important = styled.span`
  color: #f1002b;
  font-weight: bold;
`;

const Quote = styled.span`
  font-style: italic;
`;

const mark = applyMarkdown({
  '*': Important,
  '"': Quote
});

export default mark;
