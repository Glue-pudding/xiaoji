import store from '../store'
import hy from './hy'
import WebsocketHeartbeatJs from 'websocket-heartbeat-js'

// ws, 是否连接, 是否认为退出
var ws = {}, isLogin = false, isClosed = false;
export default class Websocket {
  constructor(){
    // 登录ws入参
    this.params = {
      url: `${hy.db.sessionStorage.getValue('userId')}`,                          // 接口地址
      pingTimeout: 30000,
      pongTimeout: 10000,            
      reconnectTimeout: 2000,           // 重新连接的间隔
      pingMsg: JSON.stringify({dataType: '2',appId: store.getters.appId}),      // 验证连接的消息值
    }
  }
  // 打开ws建立连接
  onSocketOpen() {
    if(!isClosed){
      ws = new WebsocketHeartbeatJs(this.params);
      ws.onopen = function() {
        // 打开已登录开关
        isLogin = true;
        isClosed = false;
      }
    }
  }
  // 发送消息
  sendSocketMsg(message){
    if(isLogin){
      ws.send(JSON.stringify(message));
    }
  }
  // 接收消息
  onReceiveMsg(callBack){
    if(isLogin){
      ws.onmessage = function(event){
        if (event.data !== 'pong' && event.data !== 'close') {
          if(typeof callBack == "function"){
            callBack(event);
          }
        } else if (event.data === 'close') {
          ws.close();
        }
      }
    }
  }
  // 手动断开连接
  closeWebSocket() {
    if(!isClosed){
      ws.close();
      isClosed = true;
      isLogin = false;
    }
  }
  // 重连事件
  onReconnect(callBack){
    ws.onreconnect = function () {
      if(typeof callBack == "function"){
        callBack();
      }
    }
  }
  // 连接出现错误
  onError(callBack){
    ws.onerror = function() {
      isLogin = false;
      if(typeof callBack == "function"){
        callBack();
      }
    }
  }
  // 连接关闭
  onClose(callBack){
    ws.onclose = function() {
      isLogin = false;
      if(typeof callBack == "function"){
        callBack();
      }
    }
  }
}