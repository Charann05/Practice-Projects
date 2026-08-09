package org.example;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.sql.SQLOutput;
import java.util.List;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    static void main() throws IOException, InterruptedException {

        System.out.print("Enter Github username :\n");
        Scanner sc = new Scanner(System.in);
        String username = sc.nextLine();
        username = username.trim();

        Request req = new Request(username);
        List<Res> res = req.fetch();
//        System.out.println(res);

        for(Res event : res){
            switch(event.type()){

                case "WatchEvent" : {
                    System.out.println(username + " Starred " + event.repo().name());
                    break;
                }

                case "PushEvent" : {

                    JsonNode commits = event.payload().get("commits");
                    if(commits != null) {
                        System.out.println(username + " performed " + event.payload().get("commits").size() + " commits on " + event.repo().name());
                        break;
                    }
                    else {
                        System.out.println(username + " pushed commits to " + event.repo().name());
                        break;
                    }
                }

                case "ForkEvent" : {
                    System.out.println(username + " forked " + event.repo().name() + " and created a copy under " + event.payload().get("forkee").get("full_name").asText());
                    break;
                }

                case "CreateEvent" : {
                    String type = event.payload().get("ref_type").asText();

                    if(type.equals("branch")) {
                        System.out.println(username + " created a " + event.payload().get("ref_type").asText() + " called " + event.payload().get("ref").asText() + " in " + event.repo().name());
                        break;
                    }
                    else if(type.equals("repository")){
                        System.out.println(username + " created a " + event.payload().get("ref_type").asText() + " named " + event.payload().get("ref").asText());
                        break;
                    }
                    else{
                        System.out.println(username + " created a " + event.payload().get("ref_type").asText() + " called " + event.payload().get("ref").asText() + " in " + event.repo().name());
                        break;
                    }
                }

                case "DeleteEvent" : {
                    String type = event.payload().get("ref_type").asText();

                    if (type.equals("branch")) {
                        System.out.println(username + " deleted a " + event.payload().get("ref_type").asText() + " called " + event.payload().get("ref").asText() + " in " + event.repo().name());
                        break;
                    } else if (type.equals("repository")) {
                        System.out.println(username + " deleted a " + event.payload().get("ref_type").asText() + " named " + event.payload().get("ref").asText());
                        break;
                    } else {
                        System.out.println(username + " deleted a " + event.payload().get("ref_type").asText() + " called " + event.payload().get("ref").asText() + " in " + event.repo().name());
                        break;
                    }
                }

                case "PublicEvent" : {
                    System.out.println(username + " made " + event.repo().name() + " public");
                    break;
                }

                default:
                    System.out.println("Unknown event occurred!");
            }
        }
    }
}
