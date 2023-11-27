package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.entity.Role;
import obtbms.repository.RoleRepository;
import obtbms.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
  private final RoleRepository repository;
  @Override
  public List<Role> findAllRolesByIds(List<Integer> ids) {
    return repository.findAllById(ids);
  }
}
