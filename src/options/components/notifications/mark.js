import * as React from 'react';
import applyMarkdown from '@utils/apply-markdown';

import Link from '../forms/Link';

const mark = applyMarkdown({
  '[]': props => <Link {...props} light />
});

export default mark;
