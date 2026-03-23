import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Breadcrumbs({ crumbs }) {
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{ color: "#8fa7ba" }} />}
      sx={{ mb: 3 }}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return isLast ? (
          <Typography
            key={i}
            sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem" }}
          >
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={i}
            component={RouterLink}
            to={crumb.to}
            sx={{
              color: "#8fa7ba",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              "&:hover": { color: "#66c0f4" },
              transition: "color 0.2s ease",
            }}
          >
            {crumb.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;