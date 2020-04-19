import React from 'react';
import List from './components/List'
import Recommend from './components/Recommend'
import Topic from './components/Topic'
import Writer from './components/Writer'
import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style'

class Home extends React.Component {
  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner" src="//upload.jianshu.io/admin_banners/web_images/4660/224da83c76e01d5deff07e163615921233af5c82.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
      </HomeWrapper>
    );
  }
};

export default Home
