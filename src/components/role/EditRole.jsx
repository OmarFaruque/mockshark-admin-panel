import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../libs/api";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Modal from "../global/Modal";

const editRole = async (
  name,
  item,
  setLoader,
  getRoles,
  modalCloseButton,
  roleModuleIds
) => {
  setLoader(true);

  const jsonData = await fetchData(`/api/v1/auth/roles/${item.id}`, "PUT", {
    name,
    moduleIds: roleModuleIds,
  });

  const message = jsonData.message;
  const success = jsonData.success;

  if (!success) {
    setLoader(false);
    showErrorToast(message);
    // eslint-disable-next-line no-throw-literal
    throw {
      message,
    };
  }

  setLoader(false);
  showSuccessToast(message);

  //fetch data
  getRoles();

  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const EditRole = ({ item, getRoles, modules }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(item?.name);

  const [roleModuleIds, setRoleModuleIds] = useState([]);

  let module_ids = [];
  useEffect(() => {
    for (var i = 0; i < item?.roleModules?.length; i++) {
      module_ids.push(item?.roleModules[i].moduleId);
    }

    setRoleModuleIds(module_ids);
  }, []);

  const modalCloseButton = useRef();

  let selectedMouduleIds = [];

  const handleModuleChange = (e) => {
    if (roleModuleIds?.includes(e.target.value)) {
      setRoleModuleIds(
        roleModuleIds?.filter((item) => {
          return item !== e.target.value;
        })
      );
    } else {
      selectedMouduleIds.push(e.target.value);

      setRoleModuleIds([...roleModuleIds, ...selectedMouduleIds]);
    }
  };

  return (
    <>
      <Modal
        modalId={"editRole" + item.id}
        modalHeader={"Edit Role"}
        modalCloseButton={modalCloseButton}
      >
        <div className="form-group">
          <label className="text-black font-w500">Role Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-black font-w500">Modules</label>
        </div>
        {modules.map((modu, index) => (
          <>
            <div className="form-group">
              <input
                key={modu.id + index}
                type="checkbox"
                className="mr-2"
                id={modu?.id}
                name={modu?.name}
                value={modu?.id}
                onChange={(e) => handleModuleChange(e)}
                defaultChecked={item?.roleModules?.some(
                  (roleMod) => roleMod?.moduleId === modu.id
                )}
              />

              <label className="text-black font-w400" htmlFor={modu?.id}>
                {modu?.name}
              </label>
            </div>
          </>
        ))}

        {loader === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="form-group">
              <Button
                buttonOnClick={() =>
                  editRole(
                    name,
                    item,
                    setLoader,
                    getRoles,
                    modalCloseButton,
                    roleModuleIds
                  )
                }
                buttonText={"Update"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default EditRole;
