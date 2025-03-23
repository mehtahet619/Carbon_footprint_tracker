// ESP32 + MQ135 + OLED + Supabase Integration
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128  
#define SCREEN_HEIGHT 64  
#define MQ135_PIN 34      
#define BUTTON_PIN 27     
#define RLOAD 22.0        
#define RZERO 76.63       

const char* ssid = "vivo 1904";    
const char* password = "PUJAN9647";    



const char* supabaseUrl = "https://xrhopfxrspyfbbobrdzr.supabase.co/rest/v1/ppm_data";
const char* apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTA4MDAsImV4cCI6MjA1ODAyNjgwMH0.PctRwNfEwzwOmZzkJhR-sfXlhxs_3PsgTjvFZR2G7Bg";  
const char* Authorization_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaG9wZnhyc3B5ZmJib2JyZHpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ1MDgwMCwiZXhwIjoyMDU4MDI2ODAwfQ.BBbA2do-Hx4sq_hsqLVyrttbjhKfuWiFNdH1M0wtKwI";

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const char* gases[] = {"CO2 PPM", "CO PPM", "NO2 PPM"};
int gasIndex = 0;  

float getPPM(float sensorValue, float a, float b) {

    float sensorVoltage = sensorValue * (3.3 / 4095.0);
    float sensorResistance = (3.3 - sensorVoltage) * RLOAD / sensorVoltage; 
    float ratio = sensorResistance / RZERO; 
    return a * pow(ratio, b); 
}
void sendToSupabase(float co2_ppm, float co_ppm, float no2_ppm) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(supabaseUrl);
        http.addHeader("Content-Type", "application/json");
        http.addHeader("apikey", apiKey);
        http.addHeader("Authorization", String("Bearer ") + Authorization_key);

        StaticJsonDocument<200> jsonDoc;
        jsonDoc["co2_ppm"] = co2_ppm;
        jsonDoc["co_ppm"] = co_ppm;
        jsonDoc["no2_ppm"] = no2_ppm;

        String jsonData;
        serializeJson(jsonDoc, jsonData);

        Serial.println("\n--- Sending Data to ppm_data Table ---");
        Serial.println(jsonData);

        int httpResponseCode = http.POST(jsonData);
        Serial.print("Supabase Response Code: ");
        Serial.println(httpResponseCode);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Response Received:");
            Serial.println(response);
        } else {
            Serial.println("Error in HTTP request!");
        }

        http.end();

        // Send data to training_data table
        HTTPClient httpTraining;
        const char* trainingDataUrl = "https://xrhopfxrspyfbbobrdzr.supabase.co/rest/v1/training_data";
        httpTraining.begin(trainingDataUrl);
        httpTraining.addHeader("Content-Type", "application/json");
        httpTraining.addHeader("apikey", apiKey);
        httpTraining.addHeader("Authorization", String("Bearer ") + Authorization_key);

        StaticJsonDocument<100> trainingJson;
        trainingJson["co2_ppm"] = co2_ppm;
        trainingJson["processed"] = false;

        String trainingJsonData;
        serializeJson(trainingJson, trainingJsonData);

        Serial.println("\n--- Sending Data to training_data Table ---");
        Serial.println(trainingJsonData);

        int trainingHttpResponseCode = httpTraining.POST(trainingJsonData);
        Serial.print("Training Data Response Code: ");
        Serial.println(trainingHttpResponseCode);

        if (trainingHttpResponseCode > 0) {
            String trainingResponse = httpTraining.getString();
            Serial.println("Training Response Received:");
            Serial.println(trainingResponse);
        } else {
            Serial.println("Error in HTTP request!");
        }

        httpTraining.end();
    } else {
        Serial.println("WiFi Disconnected!");
    }
}


void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");

    pinMode(BUTTON_PIN, INPUT_PULLUP);

    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("SSD1306 allocation failed");
        while (true);
    }
    
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    Serial.println("MQ-135 Sensor Initialized...");
}

void loop() {
    static unsigned long lastSwitchTime = 0;
    static unsigned long lastSendTime = 0;
    int sensorValue = analogRead(MQ135_PIN);

    delay(500);
    
    float co2_ppm = getPPM(sensorValue, 116.6020682, -2.769034857);
    float co_ppm = getPPM(sensorValue, 100.0, -1.5);
    float no2_ppm = getPPM(sensorValue, 50.0, -1.3);

    // Button debounce set to 500ms
    if (digitalRead(BUTTON_PIN) == LOW && millis() - lastSwitchTime > 500) {
        gasIndex = (gasIndex + 1) % 3;
        lastSwitchTime = millis();
    }

    // Update display immediately (no delay)
    display.clearDisplay();
    display.setTextSize(2);
    display.setCursor(2, 2);
    display.print(gases[gasIndex]);

    display.setTextSize(2);
    display.setCursor(SCREEN_WIDTH - 12, 2);
    display.print(">");

    display.drawLine(2, 20, 126, 20, SSD1306_WHITE);

    char formattedPPM[14];  
    float currentPPM = (gasIndex == 0) ? co2_ppm : (gasIndex == 1) ? co_ppm : no2_ppm;
    snprintf(formattedPPM, sizeof(formattedPPM), "%.2f", currentPPM);

    int valueLength = strlen(formattedPPM);
    int textSize = (valueLength <= 5) ? 4 : (valueLength <= 7) ? 3 : 2;
    display.setTextSize(textSize);

    display.setCursor(2, (SCREEN_HEIGHT - 20) / 2 + 10);
    display.print(formattedPPM);

    display.display();

    // Send all data every 2500ms
    if (millis() - lastSendTime >= 1000) {
        Serial.println("Sending all gas data...");
        sendToSupabase(co2_ppm, co_ppm, no2_ppm);
        lastSendTime = millis();
    }
}
