const passIcon = '✓';
const failIcon = '✕';

const testIndents = {};
let currentSteps = [];
let currentTest = null;

export const step = (description, fn) => {
  if (currentTest === null) {
    throw 'Steps can only be called inside a `test`, `it` and `fit`.';
  }
  currentSteps.push(description);
  fn();
};

global.test = createTestProxy(global.test);
global.it = createTestProxy(global.it);
global.fit = createTestProxy(global.fit);
global.describe = createDescribeProxy(global.describe);

function createTestProxy(func) {
  const proxy = (...args) => {
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

  // it should be pointing to the actual function
  proxy.__proto__ = func;
  return proxy;
}

function createDescribeProxy(func) {
  const proxy = (...args) => {
    const suite = func(...args);

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

  // it should be pointing to the actual function
  proxy.__proto__ = func;
  return proxy;
}

function println(value, indentLevel) {
  return '\n' + '  '.repeat(indentLevel || 0) + value;
}
