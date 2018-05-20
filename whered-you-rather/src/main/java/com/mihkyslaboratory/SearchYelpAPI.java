package com.mihkyslaboratory;

import java.net.*;
import java.io.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="SearchYelpAPI", value="/queryYelpAPI")
public class SearchYelpAPI extends HttpServlet {

  final String SEARCH_ENDPOINT = "https://api.yelp.com/v3/businesses/search";
  final String API_KEY = "YoRkXeDyFwsJA-DuzH0BOktWgYH6HoTPhiH33brhV646wQlxsm94BnbuILxWPrKe3gOKKvS7blGh0-sUN8-pbyCQVplCvsoSYfoRJD1AvfEfcjUFYJUFxxcfFQjgWnYx";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {

    response.setContentType("text/plain");

    String query_url = SEARCH_ENDPOINT + "?term=food&open_now=true&longitude=" + "-118.48207" + "&latitude=" + "34.029414";
    URL url = new URL(query_url);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Authorization", "Bearer " + API_KEY);

    int status = connection.getResponseCode();
    if (status == 200) {
      BufferedReader in = new BufferedReader(
        new InputStreamReader(connection.getInputStream()));
      String inputLine;
      StringBuffer content = new StringBuffer();
      while ((inputLine = in.readLine()) != null) {
          content.append(inputLine);
      }
      in.close();
      response.getWriter().println(content.toString());
    }
  }

  public static String getInfo() {
    return "Version: " + System.getProperty("java.version")
          + " OS: " + System.getProperty("os.name")
          + " User: " + System.getProperty("user.name");
  }
}
