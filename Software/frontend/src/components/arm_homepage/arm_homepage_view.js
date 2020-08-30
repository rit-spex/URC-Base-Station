import React from 'react'

class ArmHomepageView extends React.Component {

  // constructor
  constructor(props) {
    super(props);
  }

  // This function returns the div that we want to render
  renderItems = () => {
    return (
      <div className="arm_homepage_view"> 
        <div className="container_item container_exclusive">
          <p>TODO: make a view</p>
        </div>
      </div>
    )
  };

  // Returns jsx to render the item in react
  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}

export default ArmHomepageView