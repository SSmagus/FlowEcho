package com.flowecho.flowecho_backend.service;

import com.flowecho.flowecho_backend.entity.ExtensionUser;
import com.flowecho.flowecho_backend.repository.ExtensionUserRepository;

import java.util.UUID;

public class ExtensionUserService {
    private final ExtensionUserRepository extensionUserRepository;

    public ExtensionUserService(ExtensionUserRepository extensionUserRepository) {
        this.extensionUserRepository = extensionUserRepository;
    }

    public String saveUser(){
        ExtensionUser extensionUser= new ExtensionUser();
        String extensionKey = "ext_" + UUID.randomUUID();
        extensionUser.setExtensionKey(extensionKey);
        extensionUserRepository.save(extensionUser);
        return extensionKey;
    }
}
