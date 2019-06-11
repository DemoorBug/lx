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
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
} from './style.js'
import { actionCreators } from './store'

class Header extends React.Component {
  hotSearch () {
    const { list, focused, page, pageAll, mouseIn, mouseEnter, mouseLeave, changeSearch } = this.props
    const newList = list.toJS()
    const pageList = []
    if (newList.length) {
      for (let i = page * 10; i < (page + 1) * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => {changeSearch(pageAll, page)}}
            >换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoTitle>
            {
              pageList
            }
          </SearchInfoTitle>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
  render () {
    const { focused, handFoucus, handBlur, list } = this.props
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
            <SearchWrapper className={focused ? 'focused' : ''}>
              <NavSearch
                className="nav-search"
                onFocus={(e) => { handFoucus(list) }}
                onBlur={e => { handBlur(e) }}
              />
              <i className="iconfont">&#xe614;</i>
              {this.hotSearch()}
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

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    pageAll: state.getIn(['header', 'pageAll'])
  }
}
const mapDispathToProps = (dispath) => {
  return {
    handFoucus (list) {
      list.size === 0 && dispath(actionCreators.ajaxserch)
      dispath(actionCreators.focused)
    },
    handBlur (e) {
      dispath(actionCreators.falseFocused)
    },
    mouseEnter () {
      dispath(actionCreators.mouseenter)
    },
    mouseLeave () {
      dispath(actionCreators.mouseleave)
    },
    changeSearch (pageAll, page) {
      if (page < pageAll-1) {
        dispath(actionCreators.page_change(++page))
      } else {
        dispath(actionCreators.page_change(0))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header)
