package obtbms.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Time;
import java.text.SimpleDateFormat;


public class CustomTimeSerializer extends JsonSerializer<Time> {
  @Override
  public void serialize(Time time, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
    String formattedTime = format.format(time);
    jsonGenerator.writeString(formattedTime);
  }
}
