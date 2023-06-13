package com.project.movie.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    
    @Bean
    // ModelMapper là một thư viện ánh xạ đối tượng trong Java. Nó giúp đơn giản hóa việc chuyển đổi giữa các đối tượng khác nhau trong ứng dụng của bạn một cách dễ dàng và tự động. ModelMapper tự động ánh xạ các trường giữa các lớp tương ứng với nhau
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
