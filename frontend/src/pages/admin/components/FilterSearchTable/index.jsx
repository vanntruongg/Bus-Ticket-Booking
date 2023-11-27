import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { rolesMap, rolesData, rolesDataValue } from '@/constants/defaultData';

const FilterSearchTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          type={'text'}
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => {
            handleSearch(selectedKeys, confirm, dataIndex);
          }}
          className="block mb-2"
        />
        {dataIndex === 'roles' && (
          <ul className="p-1 m-1 border">
            {rolesDataValue.map((role) => (
              <li
                key={role.value}
                className="hover:text-primary-500 cursor-pointer"
                onClick={() => {
                  setSelectedKeys([role.value]);
                }}
              >
                {role.label}
              </li>
            ))}
          </ul>
        )}

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'roles') {
        return filterRoles(value, record.roles);
      } else {
        // console.log('record: ', record);
        // console.log('dataIndex: ', dataIndex);
        // console.log('record[dataIndex]: ', record[dataIndex]);
        return filterRecordValue(value, record[dataIndex]);
      }
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      dataIndex === 'roles' ? (
        searchedColumn === rolesMap[dataIndex] ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#00a48f',
              color: '#fff',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        )
      ) : searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#00a48f',
            color: '#fff',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const filterRoles = (value, roles) => {
    for (const role of roles) {
      if (role.roleName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    return false;
  };
  const filterRecordValue = (value, data) => {
    if (data?.locationName) {
      return data.locationName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    } else if (data?.licensePlate) {
      return data.licensePlate
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    } else {
      return data.toString().toLowerCase().includes(value.toLowerCase());
    }
  };
  return getColumnSearchProps;
};

export default FilterSearchTable;
