import { configure } from '@kadira/storybook';
import '../node_modules/font-awesome/css/font-awesome.css';
import 'bootstrapCss';
import '../node_modules/react-select/dist/react-select.min.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
