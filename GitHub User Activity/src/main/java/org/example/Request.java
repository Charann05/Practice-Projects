package org.example;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class Request {
    private final String BASE_URL;
    private final HttpClient client;
    private final ObjectMapper objectMapper;

    public Request(String username){
        BASE_URL = "https://api.github.com/users/" + username + "/events";
        client = HttpClient.newHttpClient();
        objectMapper = new ObjectMapper();
    }

    public List<Res> fetch() throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL)).GET().build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return objectMapper.readValue(response.body(), new TypeReference<>() {});
//        return response.body();
    }
}
