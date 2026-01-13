# Work Order Timeline

A dynamic, interactive timeline application for managing and visualizing work orders across multiple work centers.

## Features

*   **Interactive Timeline**: Visualize work orders with a scrollable timeline view.
*   **Zoom Levels**: Switch between Month, Week, and Day views for granular planning.
*   **Work Order Management**: Create, edit, and manage work orders via a slide-out side panel.
*   **Validation**: Robust validation prevents scheduling conflicts (overlaps) and ensures data integrity (end date > start date).
*   **Custom Styling**: Implements a "Bootstrap-Lite" architecture for the datepicker to ensure consistent rendering without full Bootstrap dependency.

## Prerequisites

*   **Node.js**: v18.13.0 or higher
*   **npm**: v8.0.0 or higher

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/robertxluo/workorder-timeline.git
    cd workorder-timeline
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Application**
    Start the development server:
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.