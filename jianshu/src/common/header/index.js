import React from 'react';
import { connect } from 'react-redux';
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
import { actionCreators } from './store'

const Header = (props) => {
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
          <SearchWrapper className={props.focused ? 'focused' : ''}>
            <NavSearch
              className="nav-search"
              onFocus={(e) => { props.handFoucus(e) }}
              onBlur={e => { props.handBlur(e) }}
            />
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
const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused'])
  }
}
const mapDispathToProps = (dispath) => {
  return {
    handFoucus (e) {
      dispath(actionCreators.focused)
    },
    handBlur (e) {
      dispath(actionCreators.falseFocused)
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header)
