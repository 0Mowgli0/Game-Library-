import { Alert } from "@mui/material";

function ErrorMessage({ message = "Något gick fel." }) {
  return (
    <Alert
      severity="error"
      sx={{
        mb: 3,
        backgroundColor: "#3a1f1f",
        color: "#ffd7d7",
      }}
    >
      {message}
    </Alert>
  );
}

export default ErrorMessage;