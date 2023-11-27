package obtbms.security;

import lombok.RequiredArgsConstructor;
import obtbms.entity.User;
import obtbms.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findById(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    return new UserDetailsImpl(user);
  }
}
