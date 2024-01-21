/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  userList: (params = {}) => request.get('/admin/applet/applet/list', { params }),
  doCreate: (data) => request.post('/admin/applet/applet/create', data),
  doUpdate: (data) => request.post('/admin/applet/applet/edit', data),
}
