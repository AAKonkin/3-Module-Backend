import PropTypes from "prop-types";
import { Icon } from "../../../../components";
import { TableRow } from "../tableRow/tableRow";
import styled from "styled-components";
import { useState } from "react";
import { PROP_TYPES } from "../../../../constants";
import { request } from "../../../../utils/request";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles: roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };
  const onUserRoleSave = (userId, newUserRoleId) => {
    request(`/api/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(
      () => {
        //requestServer('updateUserRole', userId, newUserRoleId).then(() => {
        setInitialRoleId(newUserRoleId);
      }
    );
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>

        <div className="role-column">
          <select value={selectedRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option key={roleId} value={roleId}>
                {roleName}
              </option>
            ))}
          </select>
          <Icon
            id="fa-floppy-o"
            margin="0 0 0 10px"
            disabled={isSaveButtonDisabled}
            onClick={() => onUserRoleSave(id, selectedRoleId)}
          />
        </div>
      </TableRow>
      <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;

  & select {
    font-size: 16px;
  }

  & .save-role-button {
    width: 21px;
    height: 32px;
  }
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPES.ROLE_ID.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPES.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired,
};
