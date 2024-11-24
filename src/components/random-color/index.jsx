import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import FileCopyIcon from "@mui/icons-material/FileCopy";

// Styled Paper component to add a box with shadow and padding
const StyledPaper = styled(Paper)({
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "500px",
  margin: "auto",
});

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");
  const [isDark, setIsDark] = useState(false); // Track if the background color is dark

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
    checkIfDark(hexColor);
    console.log(hexColor); // Update state with the generated hex color
  }

  function handleCreateRandomRGBColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    const rgbColor = `rgb(${r},${g},${b})`;

    setColor(rgbColor);
    checkIfDark(rgbColor);
    console.log(rgbColor);
  }

  // Function to determine if the color is dark or light
  function checkIfDark(color) {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const [r, g, b] = rgb.map(Number);
      // Using luminance formula to check if color is dark
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      setIsDark(luminance < 128); // If luminance < 128, it's dark
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert("Color code copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy color code!");
      });
  };

  const handleResetColor = () => {
    setColor("#ffffff"); // Set to white as default
    setIsDark(false);
  };

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRGBColor();
    else handleCreateRandomHexColor();
  }, [typeOfColor]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: color,
        transition: "background 0.5s ease",
        color: "#000", // Change text color based on background color
      }}
    >
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          sx={{ color: "#000", marginBottom: "20px" }}
        >
          Random Color Generator
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#000", marginBottom: "30px" }}
        >
          Generate a random HEX or RGB color
        </Typography>

        <Box sx={{ marginBottom: "30px" }}>
          <Button
            variant="outlined"
            sx={{
              margin: "0 10px",
              color: "#000",
              borderColor: "#000",
              "&:hover": {
                borderColor: "#ff4081",
                backgroundColor: "rgba(255, 64, 129, 0.1)",
              },
            }}
            onClick={() => setTypeOfColor("hex")}
          >
            HEX Color
          </Button>
          <Button
            variant="outlined"
            sx={{
              margin: "0 10px",
              color: "#000",
              borderColor: "#000",
              "&:hover": {
                borderColor: "#ff4081",
                backgroundColor: "rgba(255, 64, 129, 0.1)",
              },
            }}
            onClick={() => setTypeOfColor("rgb")}
          >
            RGB Color
          </Button>
        </Box>

        <Button
          variant="contained"
          sx={{
            marginBottom: "30px",
            backgroundColor: "#ff4081",
            "&:hover": {
              backgroundColor: "#f50057",
            },
          }}
          onClick={
            typeOfColor === "hex"
              ? handleCreateRandomHexColor
              : handleCreateRandomRGBColor
          }
        >
          Generate Random Color
        </Button>

        {/* Color Display Section */}
        <Box sx={{ textAlign: "center", color: "#000" }}>
          <Typography variant="h5" sx={{ marginBottom: "10px" }}>
            {typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {color}
          </Typography>

          {/* Copy to Clipboard Icon */}
          <IconButton
            onClick={handleCopyToClipboard}
            sx={{
              color:  "#000",
              marginTop: "20px",
              fontSize: "40px",
            }}
          >
            <FileCopyIcon />
          </IconButton>
        </Box>

        {/* Reset Button */}
        <Button
          variant="outlined"
          onClick={handleResetColor}
          sx={{
            marginTop: "20px",
            borderColor: "#fff",
            // color: "#fff",
            "&:hover": {
              borderColor: "#ff4081",
              backgroundColor: "rgba(255, 64, 129, 0.1)",
            },
          }}
        >
          Reset Color
        </Button>
      </StyledPaper>
    </Container>
  );
}
