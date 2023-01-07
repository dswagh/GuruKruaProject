import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { updateProd, getProductDetails } from "../service/API";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
///import BasicDatePicker from "../BasicDatePicker";
//import * as React from "react";

//import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  id: "",
  date: new Date(),
  productName: "xyz",
  quantity: "",
};

//const [product, setProduct] =
//useState(defaultValue);

const EditProd = () => {
  const [product, setProduct] = useState(defaultValue);
  const [value, setValue] = useState(new Date(product.date));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProdDetails = async () => {
      const resp = await getProductDetails(id);
      setValue(resp.data[0].date);
      setProduct({
        id: id,
        date: value,
        productName: resp.data[0].productName,
        quantity: resp.data[0].quantity,
      });
    };
    loadProdDetails();
  }, [id, value]);

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onValueChange1 = (event) => {
    setProduct({
      ...product,
      date: new Date(event).toLocaleDateString(),
    });
  };
  const editProductDetails = async () => {
    await updateProd(product);
    navigate("/allProduct");
  };

  return (
    <Container>
      <Typography variant="h4">Edit Products</Typography>

      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            //mask="____/__/__"
            format="dd/MM/yyyy"
            maxDate={new Date()}
            label="select date"
            value={value}
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
        <InputLabel>Product Name</InputLabel>
        <Input
          onChange={onValueChange}
          name="productName"
          value={product.productName}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Quantity</InputLabel>
        <Input
          onChange={onValueChange}
          name="quantity"
          value={product.quantity}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => editProductDetails()}>
          Edit Product
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditProd;
