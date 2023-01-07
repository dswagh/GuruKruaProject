import React from "react";
//import { Table } from "@mui/material/Table";
import {
  Button,
  //  Container,
  FormGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import { getEntries, getADayEntriesAPI } from "../service/API";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//import { addProduct } from "../service/API";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const AllEntries = () => {
  useEffect(() => {
    getADayEntries(new Date().toLocaleDateString());
  }, []);
  //const dateVar = new Date().toLocaleDateString();

  const [value, setValue] = React.useState([null, null]);
  const [entries, setEntries] = useState([]);
  const [dateV, setDateV] = useState(new Date().toLocaleDateString());

  const getADayEntries = async (date) => {
    console.log("getADayEntries......", date);
    setDateV(date);
    console.log("DateV", dateV);
    var varConv = Date.parse(new Date(date).toLocaleDateString());
    let resp = await getADayEntriesAPI(varConv);
    setEntries(resp.data);
  };
  const getAllEntries = async (date) => {
    let resp = await getEntries(value);
    setEntries(resp.data);
  };

  const StyledTable = styled(Table)`
    width: 50%;
    margin: 30px auto 0 auto;
  `;

  const THead = styled(TableRow)`
    background: #111111;
    & > th {
      color: #fff;
      font-size: 20px;
    }
  `;

  const Container = styled(FormGroup)`
    width: 20%;
    margin: 2% auto 0 auto;
    & > div {
      margin-top: 10px;
    }
  `;
  const TBody = styled(TableRow)`
    & > td {
      font-size: 18px;
    }
  `;

  // const onChangeDateHandle = (date) => {
  //   const dateVar = new Date(date).toLocaleDateString();
  //   setDateV(dateVar);
  //   getADayEntries(dateVar);
  //   //getAllEntries(dateVar);
  // };
  return (
    <>
      <Container>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Check-in", end: "Check-out" }}
        >
          <DatePicker
            //mask="____/__/__"
            format="yyyy/MM/dd"
            maxDate={new Date()}
            label="Select the date"
            value={dateV}
            size="small"
            required
            utcOffset={0}
            onChange={(evalue) => {
              getADayEntries(evalue);
            }}
            fullWidth
            inputVariant="outlined"
            animateYearScrolling
            renderInput={(params) => <TextField {...params} />}
          />
          <DateRangePicker
            calendars={3}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              console.log(
                "===========>",
                new Date(newValue[0]).toLocaleDateString()
              );
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <Button
          // startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
          //component={Link}
          onClick={getAllEntries}
        >
          Get Data
        </Button>
      </Container>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>

        <TableBody>
          {/* style={{ backgroundColor: "red" color: "white" }} 
        style={{ backgroundColor: "#461F00", color: "#fff" }}*/}
          {entries.map((entry) => (
            <TBody key={entry._id}>
              <TableCell>{entry._id}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.productName}</TableCell>
              <TableCell>{entry.quantity}</TableCell>
              <TableCell>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/editProduct/${entry._id}`}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/deleteProduct/${entry._id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllEntries;
