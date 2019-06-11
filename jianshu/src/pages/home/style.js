import styled from 'styled-components'

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
  margin-top: 30px;
  .banner {
    border-radius: 5px
    width: 625px;
    height: 270px;
  }
`

export const HomeLeft = styled.div`
  width: 625px;
  float: left;
  margin-left: 15px;
`

export const HomeRight = styled.div`
  float: right;
  width: 240px;
`

export const TopicList = styled.div`
  overflow: hidden;
  padding: 20px 10px 20px 0;
`

export const TopicItem = styled.div`
  overflow: hidden;
  float: left;
  margin: 0 10px 10px 0;
  border: 1px solid #f5e7e7;
  .imgName {
    width: 30px;
    height: 30px;
    float: left;
  }
  .pName {
    float: left;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #655f5f;
  }
`
