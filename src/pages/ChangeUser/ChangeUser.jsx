import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Checkbox, Form, Input, Select} from 'antd';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {changeList} from '../../store/MainSlice';
import {roleFilters} from '../../helper/HelperFunction';
import s from './ChangeUser.module.scss';

const ChangeUser = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {list} = useSelector(state => state.main);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) form.setFieldsValue(list.find(f => f.id === +id));
  }, []);

  const onFinish = (value) => {
    if (id) {
      const newList = list.map((m) => m.id === +id ? ({id: +id, ...value}) : m);
      dispatch(changeList(newList));
    } else {
      dispatch(changeList([...list, ({...value, id: list.length + 1})]));
    }
    navigation('/');
  };


  const birthdayFormatter = (value) => {
    let v = value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      form.setFieldsValue({'birthday': `${v.slice(0, 2)}.${v.slice(2, 4)}.${v.slice(4)}`});
    } else if (v.length >= 3) {
      form.setFieldsValue({'birthday': `${v.slice(0, 2)}.${v.slice(2)}`});
    }
  };

  const phoneFormatter = (val) => {
    let value = val.replace(/[^\d\s()+-]/g, '');
    if (!value) value = '';
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Backspace') {
        if (value.length === 1) value = '+7(';
        if (value.length === 6) value += ') ';
        if (value.length === 11) value += '-';
        form.setFieldsValue({'phone': value});
      } else {
        form.setFieldsValue({'phone': value});
      }
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      validateTrigger="onSubmit"
      className={s.form}
    >
      <Form.Item name={'name'} label={'Имя'} rules={[{required: true, message: 'Поле Имя обязательно к заполнению'}]}>
        <Input size="large" allowClear/>
      </Form.Item>

      <Form.Item
        name={'birthday'}
        label={'День рождения'}
        rules={[
          {required: true, message: ''},
          {
            validator: (_, value) => {
              const date = new Date(value.split('.').reverse().join('-'));
              if (!value) {
                return Promise.reject('Поле День рождения обязательно к заполнению');
              } else if (!value || date > new Date() || date == 'Invalid Date' || value.length < 10) {
                return Promise.reject('Введите корректную дату');
              } else {
                return Promise.resolve('');
              }
            },
          },
        ]}>
        <Input
          size="large"
          onChange={(e) => birthdayFormatter(e.target.value)}
          maxLength={16}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name={'phone'}
        label={'Номер телефона'}
        rules={[
          {required: true, message: ''},
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject('Поле Номер телефона обязательно к заполнению');
              } else if (!value || value.length < 16) {
                return Promise.reject('Введите корректный номер телефона');
              } else {
                return Promise.resolve('');
              }
            },
          },
        ]}>
        <Input
          size="large"
          onChange={(e) => phoneFormatter(e.target.value)}
          maxLength={16}
          allowClear
        />
      </Form.Item>

      <Form.Item name={'role'} label={'Должность'}
                 rules={[{required: true, message: 'Поле Должность обязательно к заполнению'}]}>
        <Select options={roleFilters()}/>
      </Form.Item>

      <Form.Item
        name={'isArchive'}
        label={'Статус'}
        valuePropName="checked"
        onChange={() => form.setFields([{name: 'isArchive', errors: []}])}>
        <Checkbox>в архиве</Checkbox>
      </Form.Item>

      <div className={s.btnWrapper}>
        <Form.Item noStyle>
          <NavLink to={'/'}> Отмена</NavLink>
        </Form.Item>
        <Form.Item noStyle>
          <Button
            type="default"
            htmlType="submit"
            size="large"
          >
            Сохранить
          </Button>
        </Form.Item>
      </div>
    </Form>


  );
};

export default ChangeUser;
