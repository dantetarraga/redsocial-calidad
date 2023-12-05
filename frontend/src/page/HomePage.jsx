import {
  Add,
  AddPhotoAlternate,
  GifBoxRounded,
  ModeCommentOutlined,
  ThumbUpAltOutlined,
  VideoLibrary,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputBase,
  Paper,
  ThemeProvider,
  Typography,
  alpha,
  createTheme,
  styled,
} from "@mui/material";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexGrow: 1,
  marginLeft: theme.spacing(1),
  backgroundColor: "#434557",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
  },
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#171923" },
    primary: {
      main: "#212330",
    },
    secondary: {
      main: "#4361EE",
    },
    body: {
      main: "#171923",
    },
    appBar: {
      main: "#212330",
    },
    drawer: {
      main: "#212330",
      hover: "#303343",
    },
    history: {
      main: "#4D526D",
    },
    post: {
      main: "#212330",
    },
  },
});

const HomePage = () => {
  const drawerWidth = 282;
  const [posts, setPosts] = useState([]);
  const [descriptionPostValue, setDescriptionPostValue] = useState("");
  const [commentPostValue, setCommentPostValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);

  const listPosts = async () => {
    setLoaderIsVisible(true);
    const response = await axios.get("http://localhost:3000/publicacion");
    setPosts(response.data);
    setLoaderIsVisible(false);
  };

  useEffect(() => {
    listPosts();
  }, []);

  const handleCreatePostClick = async () => {
    const today = new Date();
    const formattedDate = formatDateToDDMMYYYY(today);
    setLoaderIsVisible(true);

    const formData = new FormData();
    console.log("selectedVideo", selectedVideo);
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("tipoFile", "imagen");
    } else if (selectedVideo) {
      formData.append("file", selectedVideo);
      formData.append("tipoFile", "video");
    }

    formData.append("usuario", "Stefany");
    formData.append("fecha", formattedDate);
    formData.append("descripcion", descriptionPostValue);

    const response = await axios.post(
      "http://localhost:3000/publicacion/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(response);
    listPosts();
    setSelectedFile(null);
    setSelectedVideo(null);
    setLoaderIsVisible(false);
  };

  const handleChangeDescriptionPost = (event) => {
    setDescriptionPostValue(event.target.value);
  };

  const handleChangeCommentPost = (event) => {
    setCommentPostValue(event.target.value);
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // ¡Recuerda que en JavaScript, los meses van de 0 a 11!
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Agrega ceros iniciales si es necesario
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Formatea la fecha y hora como "dd/MM/yyyy HH:mm:ss"
    const formattedDateTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDateTime;
  };

  const inputFileRef = useRef(null);

  const handleIconClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Archivo seleccionado:", file);
  };

  const inputVideoRef = useRef(null);

  const handleIconClickVideo = () => {
    console.log("handleIconClickVideo");
    inputVideoRef.current.click();
  };

  const handleFileChangeVideo = (event) => {
    const maxSizeMB = 6;
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        alert(
          `El video seleccionado es demasiado grande. El tamaño máximo permitido es de ${maxSizeMB} MB.`,
        );
        setSelectedFile(null);
      } else {
        setSelectedVideo(file);
        console.log("Archivo seleccionado Video:", file);
      }
    }
  };

  const handleIconLikeClick = async (id) => {
    const today = new Date();
    const formattedDate = formatDateToDDMMYYYY(today);

    const data = {
      id,
      reaccion: "r_me_gusta",
      fecha: formattedDate,
      usuario: "Stefany",
    };
    console.log("Data reaccionar ==>", data);
    const response = await axios.post(
      "http://localhost:3000/publicacion/reacted",
      data,
    );
    console.log("response reaccionar", response);
    listPosts();
  };

  const handleEnterKeyPress = (id) => async (event) => {
    if (event.key === "Enter") {
      setLoaderIsVisible(true);
      const today = new Date();
      const formattedDate = formatDateToDDMMYYYY(today);

      const data = {
        id,
        comentario: commentPostValue,
        fecha: formattedDate,
        usuario: "Stefany",
      };
      console.log("data comentario", data);
      const response = await axios.post(
        "http://localhost:3000/publicacion/comment",
        data,
      );
      listPosts();
      setCommentPostValue("");
      setLoaderIsVisible(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Loader isVisible={loaderIsVisible} />
        <CssBaseline />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBar anchor="left" />
          <Box
            sx={{
              flexGrow: 1,
              m: 5,
            }}
          >
            <NavBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: `calc(98% - ${drawerWidth}px)`,
                mt: 5,
              }}
            >
              <Box
                component="div"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      rowGap: "10px",
                    }}
                  >
                    <IconButton
                      size="large"
                      sx={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      <Add />
                    </IconButton>
                    <Typography variant="body2" color="text.primary">
                      Tu Texto Aquí
                    </Typography>
                  </Box>
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <Box
                      key={index}
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        rowGap: "10px",
                      }}
                    >
                      <Avatar
                        alt={`Avatar ${index}`}
                        src={`URL_DEL_AVATAR_${index}`}
                        sx={{
                          width: 70,
                          height: 70,
                          "&:hover": {
                            backgroundColor: "secondary.main",
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.primary">
                        Tu Texto Aquí
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "post.main",
                  height: "147px",
                  borderRadius: "12px",
                  mt: 3,
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Search>
                    <StyledInputBase
                      sx={{ width: "100%" }}
                      placeholder="Qué estás pensando ahora?"
                      inputProps={{ "aria-label": "Qué estas pensando ahora?" }}
                      value={descriptionPostValue}
                      onChange={handleChangeDescriptionPost}
                    />
                  </Search>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <input
                    type="file"
                    ref={inputFileRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <input
                    type="file"
                    accept="video/*"
                    ref={inputVideoRef}
                    style={{ display: "none" }}
                    onChange={handleFileChangeVideo}
                  />
                  <IconButton onClick={handleIconClick}>
                    <AddPhotoAlternate />
                  </IconButton>
                  <IconButton onClick={handleIconClickVideo}>
                    <VideoLibrary />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleCreatePostClick}
                  >
                    Create a post
                  </Button>
                </Box>
              </Box>

              {posts.map((post) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 2,
                      justifyContent: "space-between",
                      backgroundColor: "post.main",
                      height: "auto",
                      borderRadius: "12px",
                      marginTop: 3,
                      p: 3,
                    }}
                  >
                    <Box sx={{ width: "100%", display: "flex", columnGap: 2 }}>
                      <Avatar alt="Small Avatar" sizes="large" />
                      <Box>
                        <Typography sx={{ fontSize: 16 }} color="text.primary">
                          {post.usuario}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px" }}
                          color="text.secondary"
                        >
                          {post.fecha}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: 14 }} color="text.pramary">
                        {post.descripcion}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "history.main",
                      }}
                    >
                      {post.fileUrl ? (
                        post.tipoFile == "imagen" ? (
                          <img
                            src={`http://localhost:3000${post.fileUrl}`}
                            alt=""
                            style={{
                              height: "360",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <video width="360" height="360" controls>
                            <source
                              src={`http://localhost:3000${post.fileUrl}`}
                              type="video/mp4"
                            />
                            Tu navegador no soporta el elemento de video.
                          </video>
                        )
                      ) : null}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleIconLikeClick(post._id)}>
                        <ThumbUpAltOutlined />
                      </IconButton>
                      <Typography
                        component="span"
                        color="text.pramary"
                        sx={{ fontSize: 14 }}
                      >
                        {post.reacciones.length}
                      </Typography>
                      <IconButton>
                        <ModeCommentOutlined />
                      </IconButton>
                      <Typography
                        component="span"
                        color="text.pramary"
                        sx={{ fontSize: 14 }}
                      >
                        {post.comentarios.length} comentarios
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                      <Search>
                        <StyledInputBase
                          sx={{ width: "100%" }}
                          placeholder="Qué estás pensando?"
                          inputProps={{ "aria-label": "Qué estás pensando?" }}
                          value={commentPostValue}
                          onChange={handleChangeCommentPost}
                          onKeyDown={handleEnterKeyPress(post._id)}
                        />
                      </Search>
                    </Box>

                    {post.comentarios.map((comentario) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "10px",
                              width: "100%",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.pramary"
                            >
                              {comentario.usuario}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.pramary"
                            >
                              {comentario.comentario}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>

            <div>
              {/* AppBar con posición fija */}
              {/* <AppBar position="fixed">
                <Toolbar>
                  <Typography variant="h6">Mi Barra de Navegación</Typography>
                </Toolbar>
              </AppBar> */}
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
