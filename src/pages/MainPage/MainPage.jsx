import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'antd';
import {roleConversion, roleFilters} from '../../helper/HelperFunction';
import Checkbox from 'antd/es/checkbox';
import {changeList} from '../../store/MainSlice';
import {NavLink, useNavigate} from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const {list} = useSelector(state => state.main);

  const changeStatus = (id, bool, e) => {
    e.stopPropagation()
    dispatch(changeList(list.map(m => m.id === id ? ({...m, isArchive: bool}) : m)));
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthday',
      sorter: (a, b) => {
        const dateA = new Date(a.birthday.split('.').reverse().join('-'));
        const dateB = new Date(b.birthday.split('.').reverse().join('-'));
        return dateA - dateB;
      },
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      filters: roleFilters(),
      onFilter: (value, record) => record.role === value,
      render: (role) => <div>{roleConversion(role)}</div>,
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone',
    },
    {
      title: 'Статус',
      dataIndex: 'isArchive',
      sorter: (a, b) => a.isArchive - b.isArchive,
      render: (isArchive, item) => <Checkbox checked={isArchive} onClick={(e) => changeStatus(item.id, !isArchive, e)}>в архиве</Checkbox>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={list}
        footer={() => (
          <NavLink to={'/add-user'}>Добавить пользователя + </NavLink>
        )}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record.id) {
                navigation(`/change-user/${record.id}`)
              }
            },
          };
        }}/>
    </>
  );
};

export default MainPage;
