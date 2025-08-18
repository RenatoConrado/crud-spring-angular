package io.github.renatoconrado.crud_spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
class SecurityConfig {

    public static final String[]
        READ = { "/test", "/user", "/foos/**" },
        WRITE = { "/foos" };

    @Bean
    SecurityFilterChain securityFilterChain(
        HttpSecurity httpSecurity
    ) throws Exception {
        httpSecurity
            .authorizeHttpRequests(authorize -> {
                authorize.requestMatchers(HttpMethod.GET, READ).permitAll();
                //.hasRole("READ");
                authorize.requestMatchers(HttpMethod.POST, WRITE).hasRole("WRITE");
                authorize.anyRequest().authenticated();
            })
            .oauth2ResourceServer(resourceServer ->
                resourceServer.jwt(Customizer.withDefaults())
            );
        return httpSecurity.build();
    }
}
