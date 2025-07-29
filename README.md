# OrangeHRM Playwright Test Automation

This project contains automated tests for the OrangeHRM demo application using Playwright.

## Features

- **Login Tests**: Automated login functionality with valid/invalid credentials
- **Menu Navigation**: Tests for navigating through all main menu items
- **Personal Information**: Tests for updating employee personal details
- **Page Object Model**: Clean, maintainable test structure using POM pattern

## Project Structure

```
├── tests/
│   ├── pages/
│   │   ├── Login.page.js      # Login page object
│   │   ├── Dashboard.page.js  # Dashboard navigation
│   │   └── MyInfo.page.js     # Personal info page object
│   ├── login.spec.js          # Login test scenarios
│   ├── menu-navigation.spec.js # Navigation tests
│   └── info.spec.js           # Personal info tests
├── playwright.config.js       # Playwright configuration
├── package.json               # Dependencies and scripts
└── .creds.env.example         # Environment variables template
```

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   cp .creds.env.example .creds.env
   # Edit .creds.env with your credentials
   ```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.js

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium

# View test report
npx playwright show-report
```

## Environment Variables

Create a `.creds.env` file with the following variables:

```
username=Admin
password=admin123
incorrectPassword=wrongPassword123
dataFirstName=YourFirstName
dataMiddleName=YourMiddleName
dataLastName=YourLastName
dataEmployeeID=12345
dataDriverLicenseNumber=D0123456789
dataLicenseExpiryDate=2025-12-31
dateOfBirth=1990-01-01
```

## Test Scenarios

### Login Tests
- ✅ Valid credentials login
- ✅ Invalid credentials error handling

### Navigation Tests
- ✅ Admin menu navigation
- ✅ PIM menu navigation
- ✅ Leave menu navigation
- ✅ Time menu navigation
- ✅ Recruitment menu navigation
- ✅ My Info menu navigation
- ✅ Directory menu navigation

### Personal Information Tests
- ✅ Update employee personal details
- ✅ Form validation and saving

## Technologies Used

- **Playwright**: End-to-end testing framework
- **JavaScript**: Programming language
- **Page Object Model**: Design pattern for maintainable tests
- **dotenv**: Environment variable management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Notes

- Tests run against the OrangeHRM demo site: https://opensource-demo.orangehrmlive.com/
- Default credentials: Admin / admin123
- Tests run in parallel across multiple browsers (Chromium, Firefox, WebKit)
