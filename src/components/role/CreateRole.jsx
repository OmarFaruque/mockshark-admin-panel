import React, { useRef, useState } from "react";
import Modal from "../global/Modal";
import fetchData from "../../libs/api";
import Loader from "../global/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../global/Button";

const createRole = async (
  name,
  getRoles,
  setLoader,
  modalCloseButton,
  moduleIds
) => {
  setLoader(true);

  const jsonData = await fetchData("/api/v1/auth/roles", "POST", { name });

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

  const jsonRoleModuleData = await fetchData(
    "/api/v1/auth/role-module",
    "POST",
    {
      roleId: jsonData.data.id,
      moduleIds,
    }
  );

  const messageModule = jsonRoleModuleData.message;
  const successModule = jsonRoleModuleData.success;

  if (!successModule) {
    setLoader(false);
    showErrorToast(messageModule);
    // eslint-disable-next-line no-throw-literal
    throw {
      messageModule,
    };
  }

  setLoader(false);

  showSuccessToast(message);

  // fetch data
  getRoles();
  //close modal
  modalCloseButton.current.click();

  return { success, message };
};

const CreateRole = ({ getRoles, modules }) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");

  const [moduleIds, setModuleIds] = useState([]);

  const modalCloseButton = useRef();

  let selectedMouduleIds = [];

  const handleModuleChange = (e) => {
    if (moduleIds.includes(e.target.value)) {
      setModuleIds(
        moduleIds.filter((item) => {
          return item !== e.target.value;
        })
      );
    } else {
      selectedMouduleIds.push(e.target.value);

      setModuleIds([...moduleIds, ...selectedMouduleIds]);
    }
  };

  return (
    <>
      <Modal
        modalId={"createRole"}
        modalHeader={"Create Role"}
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
                  createRole(
                    name,
                    getRoles,
                    setLoader,
                    modalCloseButton,
                    moduleIds
                  )
                }
                buttonText={"Submit"}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default CreateRole;
