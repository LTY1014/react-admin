import React, { useState, useEffect } from 'react';
import {Table, Card, Button, Space, Modal, Form, Input, message, Row, Col, Select, InputNumber} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import {BookVO, BookResponse, getListBookByPage, addBook, updateBook, deleteBook} from "../../api/book";
import {BookType} from "../../model/enum";

const BookList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<BookVO[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`
  });

  // 添加搜索表单
  const [searchForm] = Form.useForm();
  const searchInput = React.useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  
  // 获取列表数据
  const fetchData = async (params: { current: number; pageSize: number; bookName?: string; author?: string }) => {
    setLoading(true);
    try {
      const response = await getListBookByPage(params);
      if (response.code === 0) {
        setData(response.data.records);
        setPagination({
          ...pagination,
          current: params.current,
          pageSize: params.pageSize,
          total: response.data.total
        });
      } else {
        message.error(response.message || '获取数据失败');
      }
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
        <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
          <Input
              ref={searchInput}
              placeholder={`输入内容并按Enter键即可`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedKeys(value ? [value] : []);
                // 更新搜索表单对应的字段
                searchForm.setFieldsValue({
                  [dataIndex]: value,
                });
              }}
              onPressEnter={() => handleSearch()}
              style={{marginBottom: 8, display: 'block'}}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch()}
                icon={<SearchOutlined/>}
                size="small"
                style={{width: 90}}
            >
              搜索
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{width: 90}}
            >
              重置
            </Button>
          </Space>
        </div>
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  useEffect(() => {
    fetchData({
      ...pagination
    });
  }, []);

  const columns = [
    {
      title: '书名',
      dataIndex: 'bookName',
      key: 'bookName',
      ...getColumnSearchProps('bookName'),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: BookVO) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: BookVO) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条数据？',
      onOk: async () => {
        try {
          await deleteBook({id: id});
          message.success('删除成功');
          if (data.length === 1 && pagination.current > 1) {
            await fetchData({
              current: pagination.current - 1,
              pageSize: pagination.pageSize
            });
          } else {
            await fetchData({
              current: pagination.current,
              pageSize: pagination.pageSize
            });
          }
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingKey) {
        const response = await updateBook({
          ...values,
          id: editingKey,
        });
        if (response.code === 0) {
          message.success('更新成功');
          setIsModalVisible(false);
          await fetchData({
            current: pagination.current,
            pageSize: pagination.pageSize
          });
        } else {
          message.error(response.message || '更新失败');
        }
      } else {
        const response = await addBook(values);
        if (response.code === 0) {
          message.success('添加成功');
          setIsModalVisible(false);
          await fetchData({
            current: 1,
            pageSize: pagination.pageSize
          });
        } else {
          message.error(response.message || '添加失败');
        }
      }
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 处理搜索
  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    await fetchData({
      ...values,
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchData({
      current: 1,
      pageSize: pagination.pageSize
    });
  };

  // 修改表格变化处理函数，保留搜索条件
  const handleTableChange = (newPagination: any) => {
    const values = searchForm.getFieldsValue();
    fetchData({
      ...values,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
  };

  return (
    <div>
      <Card>
        <Form
          form={searchForm}
          layout="inline"
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={6}>
              <Form.Item
                name="bookName"
                label="书名"
              >
                <Input placeholder="请输入书名" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="author"
                label="作者"
              >
                <Input placeholder="请输入作者" allowClear />
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                >
                  搜索
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                >
                  添加
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
      </Card>

      <Modal
        title={editingKey ? "编辑" : "添加"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingKey(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="bookName"
            label="书名"
            rules={[{ required: true, message: '请输入书名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择书籍类型">
              {BookType.map((book, index) => (
                  <Select.Option key={index} value={book.value}>
                    {book.label}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
              name="price"
              label="价格"
              rules={[{ required: true, message: '请输入' }]}
          >
            <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={2}
                prefix="¥"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookList; 