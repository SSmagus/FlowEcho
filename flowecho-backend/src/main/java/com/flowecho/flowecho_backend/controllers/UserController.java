package com.flowecho.flowecho_backend.controllers;

import com.flowecho.flowecho_backend.service.ExtensionUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final ExtensionUserService extensionUserService;

    public UserController(ExtensionUserService extensionUserService) {
        this.extensionUserService = extensionUserService;
    }

    @GetMapping("/register")
    public String registerExtensionUser(){
        return extensionUserService.saveUser();
    }
}
