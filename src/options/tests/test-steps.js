const originalTest = global.it;

// todo: adjust indent according to parent
const println = (value = '', indentLevel = 0) => {
  return '\n' + '  '.repeat(indentLevel) + value;
};

const passIcon = '✓';
const failIcon = '✕';

let steps = [];

export const step = (description, fn) => {
  steps.push(description);
  fn();
};

global.it = (...args) =>  {
  const spec = originalTest(...args);
  const {resultCallback} = spec;

  spec.resultCallback = result => {
    const {description, status} = result;
    const isFailed = status === 'failed';

    // add steps to the test description
    result.description = steps.reduce((output, step, index) => {
      let icon = passIcon;

      if (isFailed && index === steps.length - 1) {
        icon = failIcon;
      }

      return output + println(`${icon} ${step}`, 4);
    }, description);

    // call original callback
    resultCallback(result);

    steps = [];
  };

  return spec;
};
