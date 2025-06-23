package com.todo.todolist.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gerenciamento de Tarefas API")
                        .version("1.0.0")
                        .description("API para gerenciamento de tarefas (CRUD de tasks)")
                        .contact(new Contact()
                                .name("Jay")
                                .email("jayme.neto139@gmail.com")
                                .url("https://www.linkedin.com/in/jaypn/")
                        )
                        .license(new License()
                                .name("GitHub")
                                .url("https://github.com/Jaypnn")
                        )
                );
    }
}
