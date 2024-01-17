/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:28:47
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import axios from 'axios'
import { request } from '@/utils'

export default {
  getMenuTree: () => request.get('/admin/permission/menu_tree'),
  getButtonAndApi: (parentId) => request.get(`/permission/button-and-api/${parentId}`),
  getComponents: () => axios.get(`${import.meta.env.VITE_PUBLIC_PATH}components.json`),
  addPermission: (data) => request.post('/admin/permission/add', data),
  savePermission: (id, data) => request.post(`/admin/permission/edit?id=${id}`, data),
  deletePermission: (id) => request.post(`/admin/permission/delete?id=${id}`),
}
