# Financial Chart Application

This project is a React-based web application that displays financial data for selected stock symbols using Chart.js. The application allows users to visualize quarterly financial metrics like net income, total revenue, and shareholder equity through an interactive chart. It features an autocomplete symbol selector to choose different stock symbols dynamically.

## Features

- **Dynamic Data Visualization**: Plot quarterly financial data such as net income, total revenue, and shareholder equity.
- **Autocomplete Symbol Selector**: Choose stock symbols via an autocomplete search box.
- **Responsive Design**: Adaptively resizes to fit different screen sizes.
- **Beautiful Loading Indicators**: Utilizes Material-UI loading components for a smoother user experience.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/TopStar423/financial-stock-data-chart
   cd financial-data-stock-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To run the application locally:
   ```bash
   npm start
   ```
This command starts the development server and opens the application in your default web browser. The application will be accessible at http://localhost:3000.

## API Configuration

The application fetches financial data using the Alpha Vantage API. You need to obtain an API key from Alpha Vantage and configure it in the project:

1. Create a .env file in the project root directory.
2. Add your Alpha Vantage API HOST and API key to the file:
   ```markfile
   REACT_APP_ALPHA_VANTAGE_API_HOST=https://www.alphavantage.co/query
   REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```
   Replace your_api_key_here with your actual Alpha Vantage API key.

## Caution

The API key provided in this project is a demo key and is limited to fetching data for specific symbols, primarily `IBM`. This key is intended for demonstration purposes only, and its usage is subject to the API provider's limitations and policies. For extensive testing or production use, please obtain a personal API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key).

### Limitations with the Demo API Key
- **Limited Data Access**: The demo API key may only provide access to a limited set of data, typically restricted to a few symbols or types of financial data.
- **Rate Limiting**: Usage of the demo API key may be rate-limited, leading to potential delays or failures in data retrieval if exceeded.

Please refer to the [Alpha Vantage documentation](https://www.alphavantage.co/documentation/) for detailed information on API capabilities and limitations.