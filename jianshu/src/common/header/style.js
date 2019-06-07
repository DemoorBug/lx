import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const HeaderWrapper = styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
`

export const Logo = styled.a.attrs({
  href: '/'
  })`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 56px;
  background: url(${logoPic});
  background-size: contain;
`

export const Nav = styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  padding-right: 20px;
  box-sizing: border-box;
`
export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    color: #969696;
  }
  &.active {
    color: #ea6f5a;
  }
`
export const SearchWrapper = styled.div`
  float: left;
  position: relative;
  &.focused {
    .nav-search {
      width: 180px;
    }
    .iconfont {
      background-color: #a99f9f;
      color: #fff;
    }
  }
  .iconfont {
    transition: all .2s;
    position: absolute;
    right: 5px;
    bottom: 5px;
    border-radius: 15px;
    width: 30px;
    line-height: 30px;
    text-align: center;
  }
`

export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  transition: all .2s;
  width: 160px;
  padding: 0 20px;
  margin: 9px 0 0 20px;
  height: 38px;
  border: none;
  outline: none;
  border-radius: 19px;
  box-sizing: border-box;
  background: #eee;
  font-size: 14px;
  &::placeholder {
    color: #999
  }
`

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`

export const Button = styled.div`
  float: right;
  line-height: 36px;
  height: 38px;
  border-radius: 19px;
  box-sizing: border-box;
  margin-top: 9px;
  padding: 0 20px;
  margin-right: 20px;
  border: 1px solid #ea6f5a;
  &.reg {
    color: #ec6149;
  }
  &.writting {
    color: #fff;
    background: #ea6f5a;
  }
`
