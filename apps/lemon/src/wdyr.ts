import React from 'react';
import { environment } from './environments/environment';

const initWdyr = async () => {
  if (environment.production) {
    return;
  }
  const whyDidYouRender = (
    await import('@welldone-software/why-did-you-render')
  ).default;
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
  });
};

initWdyr();
