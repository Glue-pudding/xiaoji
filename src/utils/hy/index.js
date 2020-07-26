/* eslint-disable */
import base from './base'
import date from './date'
import encrypt from './encrypt'
import queryString from './utils/queryString'
import database from './database'
// import system from "./system";
import regex from './regex'
import ui from './ui'
// import animate from "./animate";
// import compute from "./compute";
import axios from '../../config/http'
import tool from './tool'

import './prototype'

const hy = {
  version: '0.8',
  base: base,
  date: date,
  encrypt: encrypt,
  qs: queryString,
  db: database,
  // system: system,
  ui: ui,
  regex: regex,
  // animate: animate,
  // compute: compute,
  http: axios.axiosInstance,
  $http: axios.axios,
  tool: tool
}

window.hy = hy

export default hy
