/*
** Wrapper Component for all App Views.
** Will display the Toolbar Header, Nav and Footer on every page view.
** Child components will be rendered as per the Route.
*/

import React from 'react';

class ViewWrapper extends React.Component {
  constructor() {
    super();
  }

  render() {
    const pageId = this.props.location.pathname;
    // Having to clone to pass route props down to children.
    return (
      <div id={pageId}>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export { ViewWrapper };
