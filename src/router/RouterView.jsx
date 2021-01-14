// react-router-dom
import {Route,Switch,Redirect} from 'react-router-dom';

// 定义路由函数组件
function RouterView(props){
    return <Switch>
        {
            props.routers.map((item,index)=>{
                if(item.component){
                    return <Route key={index} path={item.path} exact={item.exact} component={item.component}/>
                }else {
                    return <Route key={index} path={item.path} exact={item.exact}>
                        <Redirect to={item.to} />
                    </Route>
                }
            })
        }
    </Switch>
}

export default RouterView;