# Circles Drawing App

A simple React-based application that allows users to draw circles using left and right mouse clicks. The circles grow in size when dragged, and change color when overlapping.

## Features

- Draw circles using left or right mouse buttons.
- Increase circle size by dragging.
- Detect overlap and change color to blue.
- Reset circle when clicked without dragging.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/circles-drawing-app.git
   ```
2. Navigate to the project folder:
   ```sh
   cd circles-drawing-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

Run the application locally:
```sh
npm start
```
Then open your browser and navigate to:
```
http://localhost:3000
```

## Controls

- **Left Mouse Click & Drag** → Draw and resize the left circle.
- **Right Mouse Click & Drag** → Draw and resize the right circle.
- **Overlapping Circles** → Change color from red to blue.

## Project Structure
```
.
├── src
│   ├── Circles.jsx  # Main component
│   ├── App.js       # Entry point
│   ├── index.js     # React DOM rendering
│   ├── styles.css   # Basic styles
├── public
├── package.json
└── README.md
```

## Technologies Used

- React.js
- JavaScript
- CSS

## License

This project is licensed under the MIT License.

---

Happy coding! 🚀

