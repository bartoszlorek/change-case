const actualTest = global.test;
const actualIt = global.it;
const actualDescribe = global.describe;

const passIcon = '✓';
const failIcon = '✕';

const println = (value, indentLevel) => {
  return '\n' + '  '.repeat(indentLevel || 0) + value;
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

const createTestProxy = func => (...args) => {
  const spec = func(...args);
  const actualResultCallback = spec.resultCallback;
  const actualOnStart = spec.onStart;

  spec.onStart = spec => {
    currentTest = spec.id;
    actualOnStart(spec);
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

    actualResultCallback(result);
    currentSteps = [];
    currentTest = null;
  };

  return spec;
};

global.test = createTestProxy(actualTest);
global.it = createTestProxy(actualIt);

global.describe = (...args) =>  {
  const suite = actualDescribe(...args);

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
