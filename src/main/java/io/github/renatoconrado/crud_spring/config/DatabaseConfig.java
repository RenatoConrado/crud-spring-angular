package io.github.renatoconrado.crud_spring.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
class DatabaseConfig {

    private @Value("${spring.datasource.url}") String url;
    private @Value("${spring.datasource.username}") String username;
    private @Value("${spring.datasource.password}") String password;
    private @Value("${spring.datasource.driver-class-name}") String driver;

    @Bean
    DataSource dataSource() {

        var config = new HikariConfig();
        config.setJdbcUrl(this.url);
        config.setUsername(this.username);
        config.setPassword(this.password);
        config.setDriverClassName(this.driver);

        config.setConnectionTestQuery("SELECT 1");

        return new HikariDataSource(config);

    }
}
