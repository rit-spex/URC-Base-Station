import React from 'react';

class LiveDataFeedPanel extends React.Component {

    render_data_field(){
        return (<p>rover data feed</p>);
    }

    render() {
        return (
            <div className="livefeed_panel">
                <div className="triangle"></div>
                {this.render_data_field()}
            </div>
        );
    }
}

export default LiveDataFeedPanel;