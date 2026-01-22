package com.flowecho.flowecho_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {
    Long session;
    String title;
    String label;
    String focus;
    Long startTimeMs;
    Long endTimeMs;
    ArrayList<String> urls;
}
