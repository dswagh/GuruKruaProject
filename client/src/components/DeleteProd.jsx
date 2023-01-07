import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRecordAPI } from "../service/API";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//const Container = styled(FormGroup)`
//   width: 50%;
//   margin: 5% auto 0 auto;
//   & > div {
//     margin-top: 20px;
//   }
// `;

//const [product, setProduct] =
//useState(defaultValue);

const DeleteProd = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    deleteRecord();
  });

  const deleteRecord = async () => {
    //console.log("AddproductDetaisl:::::" + product.id);
    await deleteRecordAPI(id);
    navigate("/allProduct");
  };
};

export default DeleteProd;
