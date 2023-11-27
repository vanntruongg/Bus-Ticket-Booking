package obtbms.service;

import obtbms.entity.Role;

import java.util.List;

public interface RoleService {
  List<Role> findAllRolesByIds(List<Integer> ids);
}
