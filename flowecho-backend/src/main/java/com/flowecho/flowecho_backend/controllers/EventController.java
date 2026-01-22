package com.flowecho.flowecho_backend.controllers;

import com.flowecho.flowecho_backend.dto.EventDto;
import com.flowecho.flowecho_backend.dto.SessionDto;
import com.flowecho.flowecho_backend.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public Map<String, String> createEvent(@RequestBody EventDto dto) {
        eventService.saveEvent(dto);
        return Map.of("status", "ok");
    }
}
