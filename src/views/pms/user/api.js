/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  create: (data) => request.post('/admin/user/add', data),
  read: (params = {}) => request.get('/admin/user/list', { params }),
  update: (data) => request.post(`/admin/role/edit?userId=${data.id}`, data),
  delete: (id) => request.post(`/admin/user/delete?userId=${id}`),
  resetPwd: (id, data) => request.post(`/admin/user/password_reset`, data),

  getAllRoles: () => request.get('/admin/role/list?enable=1'),
}
