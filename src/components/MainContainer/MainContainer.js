import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import todo from "../../assets/todo.svg";
import styles from "./MainContainer.module.css";
import {appActions} from "../../utils/redux/appSlice";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";

const MainContainer = () => {
  let res = "";
  // OR we can also create a single state object.
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [titleErr, setTitleError] = useState(false);
  const [descErr, setDescError] = useState(false);
  const tasklist = useSelector((state) => state.app.tasklist);
  const dispatch = useDispatch();
  const validateInput = () => {
    console.log(title, desc, status);
    if (title === "" || title.trim() === "") {
      setTitleError(true);
    }
    if (desc === "" || desc.trim() === "") {
      setDescError(true);
    }
    if (titleErr || descErr) {
      return false;
    }
    return true;
  };
  const addTaskHandler = () => {
    // We can use any package also to generate random id
    if (!validateInput()) {
      return;
    }
    dispatch(
      appActions.addTask({
        id: Math.floor(Math.random() + Math.random() * 10),
        title,
        desc,
        status,
      })
    );
    setTitle("");
    setDesc("");
    setStatus("");
  };
  const textHandler = (e, type) => {
    if (type === "title") {
      setTitle(e.target.value);
      setTitleError(false);
    } else if (type === "desc") {
      setDesc(e.target.value);
      setDescError(false);
    } else {
      setStatus(e.target.value);
    }
  };
  const editHandler = (task, index) => {
    if (task.id !== " ") {
      setTitle(task.title);
      setDesc(task.desc);
      setStatus(task.status);
      if (task !== "" || desc !== "" || status !== "") {
        dispatch(appActions.deleteTask({index: index}));
      }
    }
  };
  const deleteHandler = (id) => {
    dispatch(
      appActions.deleteTask({
        index: id,
      })
    );
  };
  const filterHandler = (filterVal) => {
    setFilter(filterVal);
    dispatch(appActions.filterTask(filterVal));
  };

  return (
    <Box className={styles.mainContainer}>
      <Container>
        <Grid container className={styles.alignCenter}>
          <Grid item xs={12} md={6} className={styles.commonLeft}>
            <Box>
              <Typography variant="h3">Task Manager</Typography>
              <Typography component="p">
                Allow users to add new tasks with a title and description. Display a list of all tasks with options to
                edit and delete each task.
              </Typography>
              <Box sx={{display: {xs: "block", md: "none"}}} className={styles.imgBox}>
                <img src={todo} alt="todo" />
              </Box>
              <FormControl variant="standard" className={styles.inputContainer}>
                <TextField
                  fullWidth
                  variant="outlined"
                  className={styles.mainInput}
                  placeholder="Title"
                  value={title}
                  rows={2}
                  onChange={(e) => textHandler(e, "title")}
                  error={titleErr}
                  helperText={titleErr ? "Please enter title" : ""}
                ></TextField>
                <TextField
                  fullWidth
                  variat="outlined"
                  className={styles.mainInput}
                  multiline
                  rows={4}
                  value={desc}
                  placeholder="Description"
                  onChange={(e) => textHandler(e, "desc")}
                  error={descErr}
                  helperText={descErr ? "Please enter Description" : ""}
                  required={true}
                ></TextField>
                <Select value={status} label="Status" onChange={(e) => textHandler(e, "status")} required>
                  <MenuItem disabled>Status</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
              <Box className={styles.commonPadding}>
                <Button variant="contained" onClick={addTaskHandler}>
                  Add Task
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display: {xs: "none", md: "block"}}}>
              <img src={todo} alt="todo" />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Box pt={3} pd={3}>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={styles.filter}>
              <FormControl>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  value={filter}
                  label="Status"
                  onChange={(e) => filterHandler(e.target.value)}
                  className={styles.selectBox}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {tasklist.length > 0 ? (
              <Box className={styles.boxContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width="10%">Title</TableCell>
                      <TableCell width="30%">Description</TableCell>
                      <TableCell width="20%">Status</TableCell>
                      <TableCell width="20%">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (res = tasklist.map((task, index) => {
                        if (filter === "Pending" && task.status === "Pending") {
                          return (
                            <TableRow key={task.id}>
                              <TableCell width="10%">{task.title}</TableCell>
                              <TableCell width="30%">{task.desc}</TableCell>
                              <TableCell width="20%">{task.status}</TableCell>
                              <TableCell width="20%">
                                <Box className={styles.iconBox}>
                                  <Box className={styles.editBox} onClick={() => editHandler(task, index)}>
                                    <Tooltip title="Edit">
                                      <FiEdit2 />
                                    </Tooltip>
                                  </Box>
                                  <Box className={styles.deleteBox} onClick={() => deleteHandler(index)}>
                                    <Tooltip title="Delete">
                                      <MdDeleteOutline />
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        }
                        if (filter === "Completed" && task.status === "Completed") {
                          return (
                            <TableRow key={task.id}>
                              <TableCell width="20%">{task.title}</TableCell>
                              <TableCell width="40%">{task.desc}</TableCell>
                              <TableCell width="20%">{task.status}</TableCell>
                              <TableCell width="20%">
                                <Box className={styles.iconBox}>
                                  <Box className={styles.editBox} onClick={() => editHandler(task, index)}>
                                    <Tooltip title="Edit">
                                      <FiEdit2 />
                                    </Tooltip>
                                  </Box>
                                  <Box className={styles.deleteBox} onClick={() => deleteHandler(index)}>
                                    <Tooltip title="Delete">
                                      <MdDeleteOutline />
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        }
                        if (filter === "All") {
                          return (
                            <TableRow key={task.id}>
                              <TableCell width="20%">{task.title}</TableCell>
                              <TableCell width="40%">{task.desc}</TableCell>
                              <TableCell width="20%">{task.status}</TableCell>
                              <TableCell width="20%">
                                <Box className={styles.iconBox}>
                                  <Box className={styles.editBox} onClick={() => editHandler(task, index)}>
                                    <Tooltip title="Edit">
                                      <FiEdit2 />
                                    </Tooltip>
                                  </Box>
                                  <Box className={styles.deleteBox} onClick={() => deleteHandler(index)}>
                                    <Tooltip title="Delete">
                                      <MdDeleteOutline />
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }))
                    }
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Box className={styles.commonLeft}>
                <Typography variant="span">No Data Found</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainContainer;
