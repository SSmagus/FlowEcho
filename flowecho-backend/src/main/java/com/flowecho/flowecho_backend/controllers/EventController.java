package com.flowecho.flowecho_backend.controllers;

import com.flowecho.flowecho_backend.dto.EventDto;
import com.flowecho.flowecho_backend.service.EventService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    protected void recordEvent(@RequestBody EventDto eventDto){
        eventService.saveEvent(eventDto);
    }
}
