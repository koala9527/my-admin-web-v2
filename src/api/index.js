/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:50:38
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('/admin/user/detail'),
  // 刷新token
  refreshToken: () => request.get('/auth/refresh/token'),
  // 登出
  logout: () => request.post('/admin/user/logout'),
  // 切换当前角色
  switchCurrentRole: (role) => request.post(`/admin/user/switch`, { role: role }),
  // 获取角色权限
  getRolePermissions: () => request.get('/admin/permission/tree'),
  // 验证菜单路径
  validateMenuPath: (path) => request.get(`/admin/permission/validate?path=${path}`),
}
