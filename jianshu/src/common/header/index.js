import React from 'react';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper
} from './style.js'

class Header extends React.Component {
  render () {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <Logo />
          <Nav>
            <NavItem className="left">发现</NavItem>
            <NavItem className="left">下载</NavItem>
            <NavItem className="right">登陆</NavItem>
            <NavItem className="right">
              <i className="iconfont">&#xe636;</i>
            </NavItem>
            <SearchWrapper>
              <NavSearch />
              <i className="iconfont">&#xe614;</i>
            </SearchWrapper>
          </Nav>
          <Addition>
            <Button className="writting">
              <i className="iconfont">&#xe615;</i>
              写文章
            </Button>
            <Button className="reg">注册</Button>
          </Addition>
        </HeaderWrapper>
      </React.Fragment>
    )
  }
}

export default Header
