# SecBank

SecBank is a mock banking application created for educational purposes. This project has intentional vulnerabilities to help developers and cybersecurity enthusiasts practice their skills in identifying and resolving security issues. **Use this application responsibly for learning purposes only.**

## Table of Contents
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)
  
## Features

- **Mock Banking System**: Includes common banking functionalities such as account creation, transfers, balance checking, and transaction history.
- **Built-in Vulnerabilities**: Contains deliberately implemented security flaws that developers can use to test and improve their cybersecurity skills.
- **Self-contained Environment**: Designed to be run locally or in a secure, isolated environment to avoid misuse.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/secbank.git
    cd secbank-001
    ```

2. **Run the Application with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

   Docker Compose will handle the dependency installation and application setup automatically.

3. **Access the Application**:
    Once the application is running, access it in your browser at `http://localhost:3000`.

## Usage

1. **Testing Vulnerabilities**: Explore various security vulnerabilities embedded in SecBank, such as SQL injection, XSS, CSRF, authentication flaws, etc.
   **⚠️ Important**: This application is for educational purposes only. Never deploy it in a production environment.


## Contribution

If you'd like to contribute to SecBank, please fork the repository and submit a pull request. Make sure your code is well documented and aligns with the project’s educational goals.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
