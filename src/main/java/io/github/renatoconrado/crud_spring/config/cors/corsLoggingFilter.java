package io.github.renatoconrado.crud_spring.config.cors;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class corsLoggingFilter implements Filter {

    /**
     * @throws IOException – if an I/O error occurs during the processing of the request
     * @throws ServletException – if the processing fails for any other reason
     */
    @Override
    public void doFilter(
        ServletRequest request,
        ServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        var httpRequest = (HttpServletRequest) request;
        var httpResponse = (HttpServletResponse) response;

        String origin = httpRequest.getHeader("Origin");
        String method = httpRequest.getMethod();

        log.info("CORS Request: Origin = {}, Method = {}", origin, method);

        if (method.equalsIgnoreCase("OPTIONS")) {
            log.info("CORS Preflight Request - Header: {}", httpRequest.getHeaderNames());
        }

        filterChain.doFilter(request, response);

        log.info("CORS Response Headers: {}", httpResponse.getHeaderNames());
    }

}
