import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import SocialLinks from "../components/SocialLinks";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                display: { xs: "none", md: "block" },
                maxWidth: "100%",
                margin: 0,
              }}
            >
              <img
                src="https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-imagen-de-fondo-de-la-ilustraci%C3%B3n-del-arte-conceptual-de-la-destrucci%C3%B3n-de-los-planetas.jpg"
                alt="logo"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <Box
                sx={{
                  p: 10,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  rowGap: 2,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: "2.5rem", fontWeight: "600", mb: 2 }}
                >
                  Iniciar Sesión
                </Typography>
                <SocialLinks />
                <Typography
                  variant="subtitle1"
                  align="center"
                  style={{
                    borderBottom: "1px solid #ccc",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                  }}
                >
                  <span style={{ background: "#fff", padding: "0 10px" }}>
                    o usa tu cuenta
                  </span>
                </Typography>
                <SignIn login={handleLogin} />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <Link href="#" target="_blank" underline="hover">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  style={{
                    borderBottom: "1px solid #ccc",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                  }}
                ></Typography>

                <Button
                  sx={{
                    width: "200px",
                    maxWidth: "100%",
                    alignSelf: "center",
                  }}
                  variant="contained"
                  color="success"
                >
                  Crear Cuenta
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignInPage;
