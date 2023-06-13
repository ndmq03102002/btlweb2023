package com.project.movie.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;
import java.util.function.Function;

@Log4j2
@Component
public class JwtTokenProvider {

	private String key = "QsOhbyBjw6FvIHRo4buxYyB04bqtcCBjxqEgc+G7nyAyMDIzIGPhu6dhIHRo4bqneSBExrDGoW5nIFRy4bqnbiDEkOG7qWMuIE3DtG4gaOG7jWMgZ+G7k20gMyB0w61uIHbDoCBjaOG7iSBo4buNYyAxIGJ14buVaSDEkeG7gyBiw6FvIGPDoW8uIFbDoCBk4buxIMOhbiBuw6B5IGzDoCBk4buxIMOhbiB3ZWIgduG7gSBzcGluZyBib290IHThuqFvIDEgdHJhbmcgd2ViIHhlbSBwaGltIGPDsyBraOG6oyBuxINuZyBwaMOibiBxdXnhu4FuIG5nxrDhu51pIGTDuW5nLiBBZG1pbiBjw7Mga2jhuqMgbsSDbmcgdGjDqm0gc+G7rWEgeMOzYSBjw6FjIHRo4buDIGxv4bqhaSB2w6AgbcO0IHThuqMgdOG7q25nIGLhu5kgcGhpbSwgVXNlciBjw7MgdGjhu4MgeGVtIGRhbmggc8OhY2ggcGhpbSB2w6AgYsOsbmggbHXhuq1uIMSRw6FuaCBnacOhLg==";

	private SecretKey secretKey;

	@PostConstruct
	// Khởi tạo khóa bí mật
	public void setUpSecretKey() {
		try {
			// Sử dụng thuật toán mã hóa HMAC-SHA để tạo ra một khóa bí mật từ chuỗi key để ký token
			secretKey = Keys.hmacShaKeyFor(key.getBytes("UTF-8")); 
		} catch (UnsupportedEncodingException e) {
			log.error("Error generating JWT Secret Key : {}", e.getMessage());
			throw new RuntimeException("Error generating JWT Secret Key", e);
		}
	}

	// Tạo token
	public String generateToken(Authentication authentication, String role) {
		String token = null;
		try {
			LocalDate now = LocalDate.now();
			ZoneId defaultZoneId = ZoneId.systemDefault();
			Claims clms = Jwts.claims().setSubject(authentication.getName()); // Khởi tạo đối tượng thông tin xác thực
			clms.put("role", new ObjectMapper().writeValueAsString(role)); // Đặt trường role vào thông tin xác thực
			ObjectMapper mapper = new ObjectMapper(); // Đối tượng ObjectMapper để chuyển đổi thông tin xác thực thành chuỗi JSON
			// Xây dựng token dựa trên các thông tin cần thiết
			return Jwts.builder()
					.setId(UUID.randomUUID().toString()) // Đặt id ngẫu nhiên cho chuỗi JWT
					.setClaims(clms) // Đặt thông tin xác thực người dùng vào chuỗi JWT
					.setSubject(authentication.getName()) //trường sub được đặt = tên người dùng (username) vào chuỗi JWT
					.setIssuer(authentication.getName()) // iss đại diện cho người hoặc hệ thống phát hành
					.setIssuedAt(Date.from(Instant.now())) //đặt thời gian phát hành chuỗi JWT
					.setExpiration(Date.from(now.plusDays(1).atStartOfDay(defaultZoneId).toInstant())) //đặt thời gian hết hạn của chuỗi JWT (1 ngày)
					.signWith(secretKey).compact(); // Ký chuỗi JWT bằng secretKey vừa tạo
		} catch (Exception e) {

		}
		return token;
	}
	
	//Validate token
	public boolean validateToken(String token, HttpServletRequest request) {
		try {
			// Lấy role từ tài khoản đăng nhập
			String role = getRole(token).replace("\"", "");
			
			//Phân quyền user/admin khi thực hiện các http request
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/genre")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/movie")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/genre")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/movie")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/review")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/review")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			return true;
		} catch (SignatureException ex) {// Thông báo lỗi khi token không hợp lệ
		} catch (MalformedJwtException ex) {// Thông báo lỗi khi token không đúng định dạng
		} catch (ExpiredJwtException ex) {// Thông báo lỗi khi token đã hết hạn
		} catch (UnsupportedJwtException ex) { // Thông báo lỗi khi token không được hỗ trợ 
		} catch (IllegalArgumentException ex) { // Các lỗi đối số không hợp lệ khác
		}
		return false;
	}

	//Trả về username của tài khoản đăng nhập
	public String getUsername(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return claims.getSubject();
	}
	
	//Trả về role của tài khoản đăng nhập
	public String getRole(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return (String) claims.get("role");
	}
	
	private Claims getAllClaimsFromToken(String token) {
		//phương thức parseClaimsJws() sẽ thực hiện giải mã token và trả về một đối tượng Jws<Claims>. Từ đối tượng này, chúng ta có thể lấy được body của token thông qua phương thức getBody().
		return Jwts.parser().setSigningKey(key.getBytes()).parseClaimsJws(token).getBody();
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	// Trả về dữ liệu của tài khoản đã đăng nhập sau khi được giải mã từ token
	private String getDataFromToken(String token) {
		return getClaimFromToken(token, claims -> (String) claims.get("data"));
	}
	
	private HashMap<String, Object> additionalInfo() {
        HashMap<String, Object> data = new HashMap<>();
        data.put("id", 1);
        return data;
    }
}