import React from 'react'
// import { Route } from 'react-router-dom';
import Home from './containers/Home'
import Login from './containers/Login'
import App from './containers/App';
import NotFound from './containers/NotFound';

export default [{
  path: '/',
  component: App,
  loadData: App.loadData,
  routes: [
    {
      path: "/",
      component: Home,
      loadData: Home.getSomeData,
      key: 'home',
      exact: true
    }, {
      path: "/login",
      component: Login,
      loadData: Login.loadData,
      key: 'login'
    }, {
      component: NotFound,
      key: 'NotFound'
    }
  ]
}]
// export default (
//   <div>
//     <Route path='/' exact>
//       <Home/>
//       helo
//     </Route>
//     <Route path='/ins' exact>
//       <div>Hello</div>
//     </Route>
//   </div>
// )
