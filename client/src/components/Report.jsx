import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";
import { getAllProdEntries } from "../service/API";
import { useState, useEffect } from "react";
function Report() {
  useEffect(() => {
    getAllEntries();
  }, []);
  //let prodID;

  const [entries, setEntries] = useState([]);

  const getAllEntries = async () => {
    let resp = await getAllProdEntries();

    const arr = resp.data.map((prod) => {
      console.log(prod.productName);
    });
    const onChangeProdNameHandle = () => {};
    return (
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
    );
  };
}

export default Report;
