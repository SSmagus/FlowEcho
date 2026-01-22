package com.flowecho.flowecho_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExtensionUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID extensionUserId;
    @Column(unique = true , nullable = false)
    private String extensionKey;
    private UUID pairedUserId;
}
