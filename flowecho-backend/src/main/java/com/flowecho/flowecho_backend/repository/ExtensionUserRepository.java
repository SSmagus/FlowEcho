package com.flowecho.flowecho_backend.repository;

import com.flowecho.flowecho_backend.entity.ExtensionUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExtensionUserRepository extends JpaRepository<ExtensionUser, UUID> {
}
