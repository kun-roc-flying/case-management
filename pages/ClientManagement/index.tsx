import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useState } from 'react';

const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'number',
    width: 60,
    className: 'drag-visible',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '所属委托单位',
    dataIndex: 'unit',
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    phone: 10086,
    unit: '鄂州市公安局',
    index: 0,
  },
  {
    key: '2',
    name: '李四',
    phone: 10086,
    unit: '黄石市公安局',
    index: 1,
  },
  {
    key: '3',
    name: '王五k',
    phone: 10086,
    unit: '鄂州市公安局',
    index: 2,
  },
];

export default () => {
  const [dataSource, setDataSource] = useState(data);
  const handleDragSortEnd = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable
      headerTitle="拖拽排序(默认把手)"
      columns={columns}
      rowKey="key"
      pagination={false}
      dataSource={dataSource}
      dragSortKey="number"
      onDragSortEnd={handleDragSortEnd}
    />
  );
};
