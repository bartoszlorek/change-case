const passIcon = '✓';
const failIcon = '✕';

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

global.describe = createDescribeProxy(global.describe);
global.it = createTestProxy(global.it);
global.fit = createTestProxy(global.fit);
global.test = global.it;
global.test.only = global.fit;

function createTestProxy(func) {
  const proxy = (...args) => {
    const spec = func(...args);
    const originalOnStart = spec.onStart;
    const originalResultCallback = spec.resultCallback;

    if (!(originalOnStart && originalResultCallback)) {
      return spec;
    }

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

  // extends with original function
  return Object.assign(proxy, func);
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
          parentBubbling(suite.parentSuite);
          indent += 1;
        }
      };

      parentBubbling(suite);
      testIndents[child.id] = indent;
    });

    return suite;
  };

  // extends with original function
  return Object.assign(proxy, func);
}

function println(value, indentLevel) {
  return '\n' + '  '.repeat(indentLevel || 0) + value;
}
