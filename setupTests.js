import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// polyfills
Object.values = obj => Object.keys(obj).map(key => obj[key]);
