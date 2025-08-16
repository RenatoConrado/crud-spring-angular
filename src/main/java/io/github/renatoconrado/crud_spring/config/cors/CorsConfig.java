package io.github.renatoconrado.crud_spring.config.cors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
class CorsConfig {

    public static final String[]
        ALLOWED_METHODS = { "GET", "POST", "PUT", "DELETE", "OPTIONS" },
        ALLOWED_HEADERS = { "Authorization", "Content-Type" };

    @Value("${spring.application.cors.origins}")
    private List<String> allowedOrigins;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        var source = new UrlBasedCorsConfigurationSource();
        var configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(List.of(ALLOWED_METHODS));
        configuration.setAllowedHeaders(List.of(ALLOWED_HEADERS));
        configuration.setAllowCredentials(true);

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
