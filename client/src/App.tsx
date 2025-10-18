import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";

// Mui theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

// Loading component
const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Loading />}>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/athletes" element={<AthletesPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

// Placehoders
const HomePage = () => (
  <div>
    <h1>Διαχειριστής Αθλητικών Σωματείων</h1>
    <p>Καλως ήλθατε στο σύστημα διαχείρισης αθλητικών σωματείων</p>
  </div>
);
const AthletesPage = () => (
  <div>
    <h1>Αθλητές</h1>
    <p>Διαχείριση αθλητών</p>
  </div>
);
const StaffPage = () => (
  <div>
    <h1>Προσωπικό</h1>
    <p>Διαχείριση προσωπικού</p>
  </div>
);
const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Στατιστικά και παρουσίαση</p>
  </div>
);

export default App;
