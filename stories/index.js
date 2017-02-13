import { storiesOf } from '@kadira/storybook';
import StoryDefault from './default/StoryDefault';
import StorySelectable from './default/StorySelectable';
import StoryEditable from './editable/StoryEditable';
import StoryButton from './button/StoryButton';


/*
  we can only run 1 version of Bootstrap CSS at a time. Currently the default is 4.0.0
  You can update package.json run script to start storybook with other versions of Bootstrap
  BOOTSTRAP_VERSION=3.3.7 npm run storybook
*/

storiesOf('Sematable', module)
  .add('Default', StoryDefault)
  .add('Selectable', StorySelectable)
  .add('Editable', StoryEditable)
  .add('Button', StoryButton);
