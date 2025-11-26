package com.example.videostream.dto;

public class SignupRequest {

    private String username;
    private String password;
    private String email;   // ✅ new field

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {        // ✅ getter
        return email;
    }
    public void setEmail(String email) {  // ✅ setter
        this.email = email;
    }
}
