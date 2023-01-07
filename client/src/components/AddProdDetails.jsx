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
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { addProdDetails } from "../service/API";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
// //import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// //import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import Autocomplete from "@mui/material/Autocomplete";
// import { getEntries } from "../service/API";

const Container = styled(FormGroup)`
  width: 30%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  prodId: "",
  productCat: "",
  productName: "",
  prodManfact: "",
  prodPurPrice: "",
  prodSellPrice: "",
};

const AddProdDetails = () => {
  const [product, setProduct] = useState(defaultValue);
  const [alert, setAlert] = useState(false);

  //const navigate = useNavigate();

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductDetails = async () => {
    await addProdDetails(product);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      setProduct(defaultValue);
    }, 1300);
  };

  return (
    <Container>
      {alert && (
        <Alert variant="filled" severity="success">
          Product added Successfully...!!
        </Alert>
      )}
      <Typography variant="h4">Add Products</Typography>
      <FormControl>
        <InputLabel>Product ID</InputLabel>
        <Input onChange={onValueChange} name="prodId" value={product.prodId} />
      </FormControl>

      <FormControl>
        <InputLabel>Product Catefory</InputLabel>
        <Input
          onChange={onValueChange}
          name="productCat"
          value={product.productCat}
        />
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
        <InputLabel>Prod Manfacturer</InputLabel>
        <Input
          onChange={onValueChange}
          name="prodManfact"
          value={product.prodManfact}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Product Purchase Rate</InputLabel>
        <Input
          onChange={onValueChange}
          name="prodPurPrice"
          value={product.prodPurPrice}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Product Selling Rate</InputLabel>
        <Input
          onChange={onValueChange}
          name="prodSellPrice"
          value={product.prodSellPrice}
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

// const top100Films = [
//   { label: "The Shawshank Redemption", year: 1994 },
//   { label: "The Godfather", year: 1972 },
//   { label: "The Godfather: Part II", year: 1974 },
//   { label: "The Dark Knight", year: 2008 },
//   { label: "12 Angry Men", year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: "Pulp Fiction", year: 1994 },
// ];
export default AddProdDetails;
