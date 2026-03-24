import { Box, Typography, Paper, Stack, Divider, useTheme, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import Breadcrumbs from "../components/common/Breadcrumbs";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const sections = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 32, color: "#66c0f4" }} />,
    title: "Frakt & Leverans",
    color: "#66c0f4",
    items: [
      { q: "Hur lång är leveranstiden?", a: "Digitala spel levereras omedelbart efter betalning. Fysiska spel levereras inom 2-5 arbetsdagar." },
      { q: "Vad kostar frakten?", a: "Fri frakt på alla beställningar över 299 kr. Under 299 kr tillkommer en fraktavgift på 49 kr." },
      { q: "Kan jag spåra min beställning?", a: "Ja! Du får ett spårningsnummer via e-post så snart din order skickats." },
    ],
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 32, color: "#57cc99" }} />,
    title: "Betalning",
    color: "#57cc99",
    items: [
      { q: "Vilka betalningsmetoder accepteras?", a: "Vi accepterar Visa, Mastercard, Swish, Klarna och PayPal." },
      { q: "Är betalningen säker?", a: "Ja, alla betalningar krypteras med SSL och hanteras säkert via våra betalningspartners." },
      { q: "Kan jag betala i omgångar?", a: "Ja, via Klarna kan du dela upp betalningen på 3-36 månader." },
    ],
  },
  {
    icon: <AssignmentReturnIcon sx={{ fontSize: 32, color: "#f4a261" }} />,
    title: "Retur & Ångerrätt",
    color: "#f4a261",
    items: [
      { q: "Har jag ångerrätt?", a: "Du har 14 dagars ångerrätt på fysiska spel. Digitala spel kan ej returneras efter aktivering." },
      { q: "Hur gör jag en retur?", a: "Kontakta vår kundtjänst på support@gamerzone.se med ditt ordernummer så hjälper vi dig." },
      { q: "När får jag pengarna tillbaka?", a: "Återbetalning sker inom 5-10 arbetsdagar efter att vi mottagit returen." },
    ],
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32, color: "#66c0f4" }} />,
    title: "Kundtjänst",
    color: "#66c0f4",
    items: [
      { q: "Hur kontaktar jag kundtjänst?", a: "Via e-post på support@gamerzone.se eller telefon +46 70 123 45 67, mån-fre 09-18." },
      { q: "Hur lång är svarstiden?", a: "Vi svarar inom 24 timmar på vardagar." },
      { q: "Har ni en chattfunktion?", a: "Ja, vår livechat är tillgänglig mån-fre 09-18 via hemsidan." },
    ],
  },
];

function InfoPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #1a1f2e 0%, #1f2f3d 50%, #2a3f5e 100%)"
            : "linear-gradient(135deg, #e8eef5 0%, #c8d8f0 50%, #b0c8e8 100%)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.06)",
          py: 6,
          px: { xs: 3, md: 8 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <SecurityIcon sx={{ fontSize: 40, color: "#f4a261" }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: isDark ? "#ffffff" : "#1a2a3e" }}>
              Trygg handel
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: isDark ? "#8fa7ba" : "#3a4a6e", maxWidth: 500 }}>
            All information om frakt, betalning, returer och kundtjänst — allt du behöver veta för en trygg handel hos GamerZone.
          </Typography>
        </motion.div>
      </Box>

      <PageContainer>
        <Breadcrumbs
          crumbs={[
            { label: "Hem", to: "/" },
            { label: "Trygg handel" },
          ]}
        />

        {/* Info-kort */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 6 }}>
          {[
            { icon: <LocalShippingIcon />, label: "Fri frakt", desc: "över 299 kr", color: "#66c0f4" },
            { icon: <PaymentIcon />, label: "Säker betalning", desc: "SSL-krypterad", color: "#57cc99" },
            { icon: <AssignmentReturnIcon />, label: "14 dagars", desc: "ångerrätt", color: "#f4a261" },
            { icon: <SupportAgentIcon />, label: "Kundtjänst", desc: "mån-fre 09-18", color: "#66c0f4" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ flex: 1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: "16px",
                  background: isDark
                    ? "linear-gradient(180deg, #1f2f3d 0%, #16202d 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <Box sx={{ color: item.color, mb: 1 }}>{item.icon}</Box>
                <Typography sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {item.desc}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>

        {/* Accordion sektioner */}
        {sections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: si * 0.1 }}
          >
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                {section.icon}
                <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                  {section.title}
                </Typography>
              </Stack>

              {section.items.map((item, ii) => (
                <Accordion
                  key={ii}
                  elevation={0}
                  sx={{
                    mb: 1,
                    borderRadius: "12px !important",
                    background: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.02)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.secondary }} />}
                  >
                    <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: theme.palette.text.secondary }}>
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </motion.div>
        ))}
      </PageContainer>
    </Box>
  );
}

export default InfoPage;