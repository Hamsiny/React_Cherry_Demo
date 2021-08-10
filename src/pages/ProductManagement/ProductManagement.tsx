import ProductsTable from "../../components/ProductsTable/ProductsTable";

const ProductManagement = (props) => {
  const { notify, setNotify } = props;
  return (
    <div className="widthmargin">
      <ProductsTable notify={notify} setNotify={setNotify}/>
    </div>
  );
};
export default ProductManagement;
