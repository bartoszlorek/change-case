import React from 'react';
import styled from 'styled-components';
import applyMarkdown from 'Utils/apply-markdown';

import Link from '../forms/Link';

const mark = applyMarkdown({
  '[]': <Link light />
});

export default mark;
