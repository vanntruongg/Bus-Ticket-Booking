package obtbms.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static obtbms.constant.ApiEndpoint.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  private final AuthEntryPointJwt authEntryPointJwt;
  private final JwtService jwtService;
  private final UserDetailsServiceImpl userDetailsService;

  @Bean
  public AuthFilerService authenticationFilterToken() {
    return new AuthFilerService(jwtService, userDetailsService);
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(authEntryPointJwt)
                    .accessDeniedHandler((request, response, accessDeniedException) -> {
                      response.setStatus(HttpStatus.FORBIDDEN.value());
                    })
            )
            .authorizeHttpRequests(auth -> auth
//                    .requestMatchers(AUTH_ENDPOINT + ASTERISK_MATCHER).permitAll()
//                    .requestMatchers(AUTH_REFRESH_TOKEN).permitAll()
//                    .requestMatchers(BASE_API + USER_CREATE).permitAll()
//                    .requestMatchers(BASE_API + FORGOT_PASSWORD).permitAll()
//                    .requestMatchers(BASE_API + RESET_PASSWORD).permitAll()
//                    .requestMatchers(BASE_API + PAYMENT + ASTERISK_MATCHER).permitAll()
                    .requestMatchers(BASE_API + TICKET_GET_BY_EMAIL).authenticated()
                    .anyRequest().permitAll()
            )
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    http.addFilterBefore(authenticationFilterToken(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }
}
