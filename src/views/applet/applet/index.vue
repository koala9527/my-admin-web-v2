<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:29:56
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <CommonPage>
    <template #action>
      <n-button v-permission="'AddApplet'" type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建新小程序
      </n-button>
    </template>

    <MeCrud
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.userList"
    >
      <MeQueryItem label="小程序APPID" :label-width="100">
        <n-input
          v-model:value="queryItems.app_id"
          type="text"
          placeholder="请输入小程序APPID"
          clearable
          @keydown.enter="() => $table?.handleSearch"
        />
      </MeQueryItem>
      <MeQueryItem label="小程序名称" :label-width="100">
        <n-input
          v-model:value="queryItems.name"
          type="text"
          placeholder="请输入小程序名称"
          clearable
          @keydown.enter="() => $table?.handleSearch"
        />
      </MeQueryItem>

      <MeQueryItem label="平台" :label-width="50">
        <n-select v-model:value="queryItems.platform" clearable :options="platforms" />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="modalRef" width="580px">
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
      >
        <n-form-item
          label="小程序APPID"
          path="app_id"
          :rule="{
            required: true,
            message: '请输入小程序APPID',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.app_id" :disabled="modalAction === 'edit'" />
        </n-form-item>
        <n-form-item
          label="小程序名称"
          path="name"
          :rule="{
            required: true,
            message: '请输入小程序名称',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.name" />
        </n-form-item>
        <n-form-item
          v-if="['add', 'edit'].includes(modalAction)"
          label="小程序密钥"
          path="secret"
          :rule="{
            required: true,
            message: '请输入密钥',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.secret" />
        </n-form-item>

        <n-form-item v-if="['add', 'edit'].includes(modalAction)" label="平台" path="platform">
          <n-select
            v-model:value="modalForm.platform"
            :options="platforms"
            label-field="label"
            value-field="value"
            clearable
            filterable
          />
        </n-form-item>
      </n-form>
      <n-alert v-if="modalAction === 'edit'" type="warning" closable>密钥信息务必填写准确</n-alert>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NTag } from 'naive-ui'
import { useCrud } from '@/composables'
import { formatDateTime } from '@/utils'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import api from './api'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const applets = ref([])
api.userList().then(({ data = [] }) => (applets.value = data))

const platforms = [
  { label: '微信', value: 1 },
  { label: '支付宝', value: 2 },
]

const columns = [
  { title: 'ID', key: 'id', width: 60, ellipsis: { tooltip: true } },
  {
    title: '平台',
    key: 'platform',
    width: 100,
    ellipsis: { tooltip: true },
    render: ({ platform }) => {
      let platformLabel = ''
      if (platform === 1) {
        platformLabel = '微信'
      } else if (platform === 2) {
        platformLabel = '支付宝'
      } else {
        platformLabel = '暂无平台'
      }
      return h(NTag, { type: 'success' }, { default: () => platformLabel })
    },
  },
  { title: 'APPID', key: 'app_id', width: 180, ellipsis: { tooltip: true } },
  { title: '小程序名称', key: 'name', width: 180, ellipsis: { tooltip: true } },
  {
    title: '创建时间',
    key: 'createDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['created_at']))
    },
  },

  {
    title: '操作',
    key: 'actions',
    width: 320,
    align: 'right',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            onClick: () => handleOpen({ action: 'edit', title: '编辑', row, onOk: onSave }),
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-fe:settings text-14' }),
          }
        ),
      ]
    },
  },
]

const { modalRef, modalFormRef, modalForm, modalAction, handleOpen, handleSave, handleAdd } =
  useCrud({
    name: '小程序',
    initForm: { enable: true },
    doCreate: api.doCreate,
    doUpdate: api.doUpdate,
    refresh: () => $table.value?.handleSearch(),
  })

function onSave() {
  if (modalAction.value === 'edit') {
    return handleSave({
      api: () => api.doUpdate(modalForm.value),
      cb: () => $message.success('修改成功'),
    })
  } else if (modalAction.value === 'create') {
    return handleSave({
      api: () => api.doCreate(modalForm.value),
      cb: () => $message.success('创建成功'),
    })
  }
  handleSave()
}
</script>
