package com.notes.Backend.security;


import com.notes.Backend.services.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationService authenticationService;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try{
            String token = extractToken(request);
            if (token != null){
                UserDetails userDetails = authenticationService.validateToken(token);
                log.info("👤 Usuario autenticado: {}", userDetails.getUsername());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                if (userDetails instanceof NotesUserDetails){
                    UUID userId = ((NotesUserDetails) userDetails).getId();
                    log.info("✅ userId seteado en request: {}", userId);
                    request.setAttribute("userId", userId);
                    //request.setAttribute("userId", ((NotesUserDetails) userDetails).getId());
                }
            }
        }catch (Exception e){
            // Do not throw exceptions, just don't authenticate the user
            log.warn("Recieved invalid auth token");
            log.warn("⚠️ Token inválido: {}", e.getMessage());
        }


        filterChain.doFilter(request, response);

    }

    private String extractToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return  null;
    }
}
