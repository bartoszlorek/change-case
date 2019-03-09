import React from 'react';
import styled from 'styled-components';
import applyMarkdown from '../../.utils/apply-markdown';

import Link from '../forms/Link';

const mark = applyMarkdown({
  '[]': <Link light />
});

export default mark;
