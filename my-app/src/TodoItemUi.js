import React, { Fragment } from 'react';
import { Input, Row, Col, Button, List, message } from 'antd';
import store from './store';

const TodoItemUi = (props) => {
  return (
    <Fragment>
      <Row style={{ paddingTop: '10px' }}>
        <Col span={6} offset={7}>
          <Input
            placeholder="Basic usage"
            value={props.state.inputValue}
            onChange={(e) => {
              store.dispatch({
                type: 'change_input_value',
                value: e.target.value
              })
            }}
            onKeyUp={e => {
              if (e.target.value === '') {
                message.warning('不能为空哦');
                return
              }
              if (e.keyCode === 13) {
                store.dispatch({
                  type: 'add_click_list'
                })
              }
            }}
          />
        </Col>
        <Col span={3} offset={1}>
          <Button
            type="dashed"
            onClick={() => {
              if (props.state.inputValue === '') {
                message.warning('不能为空哦');
                return
              }
              store.dispatch({
                type: 'add_click_list'
              })
            }}
          >提交</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col span={9} offset={7}>
        <List
          size="small"
          bordered
          dataSource={props.state.list}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => {
                store.dispatch({
                  type: 'remove_list_data',
                  value: index
                })
              }}
            >
              {item}
            </List.Item>
          )}
        />
        </Col>
      </Row>
    </Fragment>
  )
}
// class TodoItemUi extends React.Component {
//   render () {
//     return (
//       <Fragment>
//         <Row style={{ paddingTop: '10px' }}>
//           <Col span={6} offset={7}>
//             <Input
//               placeholder="Basic usage"
//               value={this.props.state.inputValue}
//               onChange={(e) => {
//                 store.dispatch({
//                   type: 'change_input_value',
//                   value: e.target.value
//                 })
//               }}
//               onKeyUp={e => {
//                 if (e.target.value === '') {
//                   message.warning('不能为空哦');
//                   return
//                 }
//                 if (e.keyCode === 13) {
//                   store.dispatch({
//                     type: 'add_click_list'
//                   })
//                 }
//               }}
//             />
//           </Col>
//           <Col span={3} offset={1}>
//             <Button
//               type="dashed"
//               onClick={() => {
//                 if (this.props.state.inputValue === '') {
//                   message.warning('不能为空哦');
//                   return
//                 }
//                 store.dispatch({
//                   type: 'add_click_list'
//                 })
//               }}
//             >提交</Button>
//           </Col>
//         </Row>
//         <Row style={{ marginTop: '10px' }}>
//           <Col span={9} offset={7}>
//           <List
//             size="small"
//             bordered
//             dataSource={this.props.state.list}
//             renderItem={(item, index) => (
//               <List.Item
//                 onClick={() => {
//                   store.dispatch({
//                     type: 'remove_list_data',
//                     value: index
//                   })
//                 }}
//               >
//                 {item}
//               </List.Item>
//             )}
//           />
//           </Col>
//         </Row>
//       </Fragment>
//     )
//   }
// }

export default TodoItemUi
