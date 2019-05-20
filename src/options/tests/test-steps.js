const originalTest = global.it;
const originalDescribe = global.describe;

const passIcon = '✓';
const failIcon = '✕';

const println = (value = '', indentLevel = 0) => {
  return '\n' + '  '.repeat(indentLevel) + value;
};

const testIndents = {};
let currentSteps = [];
let currentTest = null;

export const step = (description, fn) => {
  if (currentTest === null) {
    throw 'Steps can only be called inside a test.';
  }

  currentSteps.push(description);
  fn();
};

global.it = (...args) =>  {
  const spec = originalTest(...args);
  const originalResultCallback = spec.resultCallback;
  const originalOnStart = spec.onStart;

  spec.onStart = spec => {
    currentTest = spec.id;
    originalOnStart(spec);
  };

  spec.resultCallback = result => {
    const {description, status} = result;
    const isFailed = status === 'failed';

    result.description = currentSteps.reduce((output, step, index) => {
      let icon = passIcon;

      if (isFailed && index === currentSteps.length - 1) {
        icon = failIcon;
      }

      return output + println(`${icon} ${step}`, testIndents[spec.id] + 1);
    }, description);

    originalResultCallback(result);
    currentSteps = [];
    currentTest = null;
  };

  return spec;
};

global.describe = (...args) =>  {
  const suite = originalDescribe(...args);

  suite.children.forEach(child => {
    if (child.constructor.name !== 'Spec') {
      return;
    }

    let indent = 1;

    const parentBubbling = suite => {
      if (suite.parentSuite) {
        parentBubbling(suite.parentSuite)
        indent += 1;
      }
    };

    parentBubbling(suite);
    testIndents[child.id] = indent;
  });

  return suite;
};
