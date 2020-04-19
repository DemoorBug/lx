import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  TopicList,
  TopicItem
} from '../style'

class Topic extends React.Component {
  render () {
    const { topicList } = this.props;
    console.log(topicList);
    return (
      <Fragment>
        <TopicList>
          {
            topicList.map(item => (
              <TopicItem key={item.get('id')}>
                <img className="imgName" src={item.get('imgUrl')} alt=""/>
                <p className="pName">{item.get('title')}</p>
              </TopicItem>
            ))
          }
        </TopicList>
      </Fragment>
    );
  }
};

const mapState = (state) => ({
  topicList: state.getIn(['topic', 'topicList'])
})

export default connect(mapState, null)(Topic)
