import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import React, { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  case_name?: string;
  date?: number;
  type?: string;
  case_id?: string;
  // report_id?: string,  // 报告编号
  client_unit?: string;
  // client_name?: string, // 客户姓名
  // client_number?: string, // 客户电话
  case_pricipal?: string;
  case_schedule?: string;
  // provide_report?: boolean, // 是否出具报告
  // APF?: number, // 鉴定费
  // charge_situation?: string, // 收费情况
  // material_situation?: string, // 检材情况
  // is_archive?: boolean, // 是否归档
  // lack_material?: string, // 归档所缺少的材料
  // appraiser?: string, // 鉴定人
  // verifier?: string, // 审核人
  remark?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 1,
    case_name: '案件名称',
    date: 1590481162000,
    type: 'data',
    case_id: '案件受理编号',
    // report_id: '报告编号',
    client_unit: '委托单位',
    // client_name: '委托人姓名',
    // client_number: '委托人电话',
    case_pricipal: '案件负责人',
    case_schedule: 'closed',
    // provide_report: true,
    // APF: 3000,
    // charge_situation: '收费情况',
    // material_situation: '检材情况',
    // is_archive: false,
    // lack_material: '归档所缺的文件',
    // appraiser: '鉴定人',
    // verifier: '审核人',
    remark: '备注',
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '8%',
    },
    {
      title: '案件名称',
      dataIndex: 'case_name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
    },
    {
      title: '案件承接日期',
      dataIndex: 'date',
      valueType: 'date',
      width: '13%',
    },
    {
      title: '案件类型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        data: {
          text: '电子数据',
          status: 'Success',
        },
        record: {
          text: '录音鉴定',
          status: 'Success',
        },
      },
      width: '10%',
    },
    {
      title: '案件编号',
      dataIndex: 'case_id',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
    },
    {
      title: '委托单位',
      dataIndex: 'client_unit',
    },
    {
      title: '负责人',
      dataIndex: 'case_principal',
    },
    {
      title: '完成进度',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        open: {
          text: '未完成',
          status: 'Error',
        },
        closed: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '鉴定费',
      dataIndex: 'APF',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 130,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="案件信息"
        maxLength={50}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 100000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
