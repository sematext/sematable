import React from 'react';
import { action } from '@kadira/storybook';
require ('./button.css');

/*
A simple example of how you can use Storybook to isolate and test individual components
*/


const StoryButton = () => (
  <div>
    <h3 className="aboutSimpleStoryButton">A simple example of how you can use Storybook to isolate and test individual components</h3>
    <button className="simpleStoryButton" onClick={action('clicked')}>😀 😎 👍 💯</button>
  </div>
  )

export default StoryButton;