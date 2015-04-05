import props from './src/props';
import Engine from './../engine/index';

var jDoc = Object.defineProperties({}, props);
jDoc.Engine = Engine;

window.jDoc = jDoc;