package com.project.movie.domain.dto;

import com.project.movie.domain.dao.User;
import lombok.Data;

@Data
public class LoginResponse {
	private User user;
	private TokenResponse token;

	public LoginResponse(User user, TokenResponse token) {
		this.user = user;
		this.token = token;
	}
}
