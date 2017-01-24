import React from 'react';
import { action } from '@kadira/storybook';

/*
note: While this has nothing to do with Sematable right now, it's a cute example and demonstrates how to use Storybook to test and isolate components
This example could be used as the basis to test out the header toolbars or other complimentary compliments besides the table itself
*/

const StoryButton = () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  )

export default StoryButton;