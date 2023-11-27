package obtbms.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtService {

  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expire-time-access-token}")
  private long expireTimeAccessToken;
  @Value("${jwt.expire-time-refresh-token}")
  private long expireTimeRefreshToken;

  private Key getSignKey() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }

  public String generateAccessToken(UserDetailsImpl userDetails) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .claim("email", userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expireTimeAccessToken))
            .signWith(getSignKey(), SignatureAlgorithm.HS512)
            .compact();
  }

  public String generateRefreshToken(UserDetailsImpl userDetails) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expireTimeRefreshToken))
            .signWith(getSignKey(), SignatureAlgorithm.HS512)
            .compact();
  }

  public String getEmailFromToken(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSignKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
      return true;
    } catch (MalformedJwtException exception) {
      log.error("Invalid JWT token: {}", exception.getMessage());
    } catch (UnsupportedJwtException exception) {
      log.error("JWT is unsupported: {}", exception.getMessage());
    } catch (ExpiredJwtException exception) {
      log.error("JWT is expired: {}", exception.getMessage());
    } catch (IllegalThreadStateException exception) {
      log.error("JWT claims string is empty: {}", exception.getMessage());
    }
    return false;
  }
}
