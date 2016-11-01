import { configure } from '@kadira/storybook';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
