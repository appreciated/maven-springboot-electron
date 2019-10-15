package com.github.appreciated.spring;

import java.io.Serializable;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

@Service
public class MessageBean implements Serializable {

    public String getMessage() {
        return "Button was clicked at " + LocalTime.now();
    }
}
