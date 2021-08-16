import ProductsTable from "../../components/ProductsTable/ProductsTable";

const ProductManagement = (props) => {
  const { notify, setNotify, authAxios } = props;
  return (
    <div className="widthmargin">
      <ProductsTable notify={notify} setNotify={setNotify} authAxios={authAxios}/>
    </div>
  );
};
export default ProductManagement;
