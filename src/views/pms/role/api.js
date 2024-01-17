/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:27
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  create: (data) => request.post('/admin/role/addRole', data),
  read: (params = {}) => request.get('/admin/role/page', { params }),
  update: (data) => request.post(`/admin/role/editRole?roleId=${data.id}`, data),
  delete: (id) => request.post(`/admin/role/deleteRole?roleId=${id}`),

  getAllPermissionTree: () => request.get('/admin/permission/tree'),
  getAllUsers: (params = {}) => request.get('/admin/user/list', { params }),
  addRoleUsers: (roleId, data) => request.post(`/admin/role/addUser?roleId=${roleId}`, data),
  removeRoleUsers: (roleId, data) => request.post(`/admin/role/deleteUser?roleId=${roleId}`, data),
}
