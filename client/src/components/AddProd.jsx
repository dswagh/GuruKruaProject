import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/API";
//import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllProdEntries } from "../service/API";

const Container = styled(FormGroup)`
  width: 30%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  date: new Date().toLocaleDateString,
  productName: "",
  quantity: "",
};

const AddProd = () => {
  const [product, setProduct] = useState(defaultValue);
  const [alert, setAlert] = useState(false);
  //const [prodName, setProdName] = useState();

  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    getAllEntries();
  }, []);
  //let prodID;
  const [entries, setEntries] = useState([]);
  const getAllEntries = async () => {
    let resp = await getAllProdEntries();

    const arr = resp.data.map((prod) => {
      console.log(prod.productName);
      return {
        id: prod.prodId,
        label:
          prod.prodId +
          " |  " +
          prod.productName +
          " | " +
          prod.prodManfact +
          " | " +
          prod.prodSellPrice,
      };
    });
    setEntries(arr);
    console.log(entries);
  };

  //-------------------------------------------------------------------------------------------------------

  const onChangeProdNameHandle = (val) => {
    console.log("prodName", val);
    setProduct({
      ...product,
      productName: val.label,
      prodId: val.id,
    });
  };
  //const navigate = useNavigate();

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductDetails = async () => {
    console.log("...product....", product);
    const resp = await addProduct(product);
    if (resp.status === 201) {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
        window.location.reload(false);
      }, 1500);
    }
  };
  const [value, setValue] = useState(new Date());
  const onValueChange1 = (event) => {
    setProduct({
      ...product,
      date: new Date(event).toLocaleDateString(),
    });
  };
  return (
    <Container>
      {alert && (
        <Alert variant="filled" severity="success">
          Entry added Successfully...!!!!
        </Alert>
      )}
      <Typography variant="h4">Add Products</Typography>

      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            //mask="____/__/__"
            format="dd/MM/yyyy"
            maxDate={new Date()}
            label="Select the date"
            value={product.date}
            size="small"
            required
            onChange={(evalue) => {
              onValueChange1(evalue);
              setValue(evalue);
            }}
            fullWidth
            inputVariant="outlined"
            animateYearScrolling
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl>
        <Autocomplete
          options={entries}
          id="flat-demo"
          //value={prodName}
          onChange={(_, val) => {
            onChangeProdNameHandle(val);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select product" variant="standard" />
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Enter quantiy in gram(1kg to 1000gm)</InputLabel>
        <Input
          onChange={onValueChange}
          name="quantity"
          value={product.quantity}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => addProductDetails()}>
          Add Details{" "}
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddProd;
