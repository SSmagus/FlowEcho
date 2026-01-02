package com.flowecho.flowecho_backend.repository;

import com.flowecho.flowecho_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
