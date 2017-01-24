import { storiesOf } from '@kadira/storybook';
import StoryDefault from "./default/StoryDefault";
import StoryEditable from "./editable/StoryEditable";
import StoryBootstrapThree from "./bootstrap/v3.3.7/StoryBootstrapThree";
import StoryBootstrapFour from "./bootstrap/v4.0.0/StoryBootstrapFour";
import StoryButton from "./button/StoryButton";

storiesOf('Sematable', module)
  .add('default', StoryDefault)
  .add('Editable Cell', StoryEditable)
  .add('Boostrap v3.3.7', StoryBootstrapThree)
  .add('Boostrap v4.0.0', StoryBootstrapFour)
  .add('Button', StoryButton);
