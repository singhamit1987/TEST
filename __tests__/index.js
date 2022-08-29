require('@babel/polyfill');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const {
  configure, mount, shallow,
} = require('enzyme');
const jsdom = require('jsdom');

process.env.NODE_ENV = 'test';
process.env.TARGET_ENV = 'test';

configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;
const { document } = new JSDOM('', { url: 'http://localhost:3000' }).window;
const divApp = global.document.createElement('div');

divApp.className = 'react-boilerplate';

global.mount = mount;
global.shallow = shallow;
global.document = document;
global.window = document.defaultView;
global.document.body.appendChild(divApp);

// turn off console.log, console.warn, console.debug
global.console = {
  ...console,
  debug: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
};
