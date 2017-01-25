import { configure } from '@kadira/storybook';
import 'bootstrap-css';
import '../node_modules/react-select/dist/react-select.min.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
