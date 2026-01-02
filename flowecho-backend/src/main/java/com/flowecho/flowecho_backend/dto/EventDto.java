package com.flowecho.flowecho_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    String source;
    String url;
    Long timestamp;
    String event;
}
