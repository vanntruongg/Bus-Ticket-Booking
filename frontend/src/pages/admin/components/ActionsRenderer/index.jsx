import { Button, Popconfirm, Space } from 'antd';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';

import { accountStatus } from '@/resources/dataDefault';
const ActionsRenderer = ({
  type,
  record,
  handleOpenEdit,
  popconfirmStates,
  setPopconfirmStates,
  handleDelete,
  loading,
}) => {
  const handleShowModalCofirmDelete = (recordKey) => {
    setPopconfirmStates({ ...popconfirmStates, [recordKey]: true });
  };

  const handleCancelDelete = (recordKey) => {
    setPopconfirmStates({ ...popconfirmStates, [recordKey]: false });
  };

  const handleShowModalCofirmEnable = (recordKey) => {
    setPopconfirmStates({ ...popconfirmStates, [recordKey]: true });
  };
  // console.log('Record: ', record);
  // console.log('popconfirmStates: ', popconfirmStates);
  return (
    <Space>
      <Button
        className="px-1 py-0.5 text-blue-500 border-[1.5px] rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200"
        type="vartical"
        onClick={() => handleOpenEdit(record)}
      >
        <TbEdit size={18} />
      </Button>
      <Popconfirm
        key={record?.email || record?.tripId || record?.routeId}
        title={
          record?.email && record.status === accountStatus.ACTIVE
            ? 'Kích hoạt lại tài khoản'
            : `Xóa ${type}`
        }
        description={
          record?.email && record.status === accountStatus.ACTIVE
            ? `Kích hoạt lại tài khoản ${record?.email}`
            : `Bạn chắc chắn xóa ${type.toUpperCase()}: ${
                record?.email || record?.tripId || record?.routeId
              }`
        }
        open={popconfirmStates}
        onConfirm={() => {
          const id =
            record?.email ||
            record?.tripId ||
            record?.tripDate ||
            record?.routeId;
          // console.log(id);
          handleDelete(id);
        }}
        okButtonProps={{
          loading: loading,
        }}
        onCancel={() =>
          handleCancelDelete(record?.email || record?.tripId || record?.routeId)
        }
      >
        {record.status ? (
          record.status === accountStatus.ACTIVE ? (
            <Button
              className="px-1 py-0.5 text-red-500 border-[1.5px] rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
              type="vartical"
              onClick={() =>
                handleShowModalCofirmDelete(
                  record?.email || record?.tripId || record?.routeId,
                )
              }
            >
              <MdOutlineDelete size={18} />
            </Button>
          ) : (
            record.status === accountStatus.DISABLE && (
              <Button
                className="px-1 py-0.5 text-gray-500 border-[1.5px] rounded-md hover:bg-gray-300 hover:text-white transition-all duration-200"
                type="vartical"
                onClick={() => handleShowModalCofirmEnable(record?.email)}
              >
                <VscDebugRestart />
              </Button>
            )
          )
        ) : (
          <Button
            className="px-1 py-0.5 text-red-500 border-[1.5px] rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
            type="vartical"
            onClick={() =>
              handleShowModalCofirmDelete(
                record?.email || record?.tripId || record?.routeId,
              )
            }
          >
            <MdOutlineDelete size={18} />
          </Button>
        )}
      </Popconfirm>
    </Space>
  );
};

export default ActionsRenderer;
