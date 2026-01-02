# Hotel Booking Demo – API & UI Test Automation

Simple hotel booking demo application designed for **API Test Automation (Postman)** and  
**UI Test Automation (Selenium WebDriver)**.

This project was created as part of an academic **Test Automation Term Project** and focuses on
**testability, stable selectors, and automation-friendly structure** rather than visual design.

---

## Project Scope

This project covers **both parts of the assignment**:

### 1️-API Test Automation – Postman
- REST API tested using Postman
- Positive, Negative, and Edge case scenarios
- HTTP methods: GET, POST, PUT, DELETE
- Status code validations
- Response body assertions
- Postman Collections and Environments
- Collection Runner execution

### 2️-UI Test Automation – Selenium
- Fully automated UI tests using Selenium WebDriver (ChromeDriver)
- Stable locator strategies (`data-testid`, `id`, `css`, `xpath`)
- Negative and edge case scenarios included
- Tests executable locally via Node.js

---

## Application Features

- Simple hotel booking flow
- Mock REST API using `json-server`
- Selenium-friendly UI (no random DOM, no animations)
- Stable `data-testid` attributes for all interactive elements
- No authentication or third-party popups
- Suitable for **local execution** and **public deployment**

---

## Live Deployment (Render)

### Public URLs
- **UI:** https://hotel-booking-ui-czp6.onrender.com  
- **API:** https://hotel-booking-api-29et.onrender.com  

These URLs are used in **both Postman API tests and Selenium UI tests**.

---

## API Endpoints (Mock API)

- `GET /hotels`
- `GET /bookings`
- `POST /bookings`
- `GET /bookings/{id}`
- `PUT /bookings/{id}`
- `DELETE /bookings/{id}`

> Note: This API is a mock (`json-server`).  
> Some invalid inputs are intentionally accepted and documented as **edge cases**.

---

## Postman API Test Automation

### Repository Files
postman/

├── Booking API Test Collection.postman_collection.json

└── HotelBooking.postman_environment.json


### Online Postman Collection
https://esinbegumkaya-930706.postman.co/workspace/Param.com~6aecd15d-8277-4f8a-9958-5131f45b125a/collection/50767469-83e60726-a0b1-4a1a-9c03-159dc1f98e88

### Covered Scenarios
- Create booking (positive)
- Get booking by ID
- Update booking
- Delete booking
- Invalid input scenarios (negative)
- Edge cases:
  - Past date booking
  - Same-day booking
  - Check-in after check-out
  - Very long input values

---

## Selenium UI Test Automation

### Technology Stack
- Selenium WebDriver
- ChromeDriver
- Node.js

### Folder Structure
selenium/

└── tests/

├── 01_bookingFlow_happyPath.test.js

├── 02_invalidDate_showsError.test.js

├── 03_sameDay_booking_edgeCase.test.js

├── 04_backNavigation_state.test.js

└── 05_refresh_results_stillWorks.test.js


### UI Test Scenarios
1. Happy path hotel booking flow
2. Invalid date selection (negative case)
3. Same-day booking (edge case)
4. Back navigation state behavior
5. Refresh behavior after search

### Run Selenium Tests
```bash
cd selenium
node tests/01_bookingFlow_happyPath.test.js

Local Development
Local URLs

UI: http://localhost:3000

Mock API: http://localhost:3001

Requirements

Node.js 16+ (Node 18+ recommended)

npm

Author

Esin Begüm Kaya


