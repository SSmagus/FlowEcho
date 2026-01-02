package com.flowecho.flowecho_backend.service;

import com.flowecho.flowecho_backend.dto.EventDto;
import com.flowecho.flowecho_backend.entity.Event;
import com.flowecho.flowecho_backend.repository.EventRepository;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public void saveEvent(EventDto eventDto){
        Event event= new Event();
        event.setEvent(eventDto.getEvent());
        event.setUrl(eventDto.getUrl());
        event.setSource(eventDto.getSource());
        event.setTimestamp(eventDto.getTimestamp());
        eventRepository.save(event);
    }
}
