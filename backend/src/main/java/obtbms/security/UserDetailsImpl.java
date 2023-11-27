package obtbms.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import obtbms.entity.Role;
import obtbms.entity.User;
import obtbms.enums.AccountStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Builder
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
  private transient User user;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
    for (Role role : user.getRoles()) {
     simpleGrantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
    }
    return simpleGrantedAuthorities;
  }

  @Override
  public String getUsername() {
    return user.getEmail();
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  public String getFirstName() {
    return user.getFirstName();
  }
  public String getLastName() {
    return user.getLastName();
  }
  public String getPhone() {
    return user.getPhone();
  }
  public String getAvatar() {
    return user.getImgUrl();
  }
  public AccountStatus getStatus() {
    return user.getStatus();
  }
  public List<String> getRole() {
    return user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList());
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
