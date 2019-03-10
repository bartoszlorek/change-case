import * as React from 'react';
import applyMarkdown from 'Utils/apply-markdown';

import Link from '../forms/Link';

const mark = applyMarkdown({
  '[]': props => <Link {...props} light />
});

export default mark;
