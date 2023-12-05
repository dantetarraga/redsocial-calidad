import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SignIn = ({ login }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl variant="filled" sx={{ mb: 2, width: "100%" }}>
        <InputLabel htmlFor="email">Correo Electronico</InputLabel>
        <FilledInput id="email" />
      </FormControl>
      <FormControl variant="filled" sx={{ mb: 2, width: "100%" }}>
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <FilledInput id="password" />
      </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={login}>
        Iniciar Sesionnn
      </Button>
    </Box>
  );
};

export default SignIn;
