import Card from "../components/Card";
import View from "../components/normalizers/View";
import { flex, wrap } from "../utils/flex";
import mock from "../mockData.json";
import Typography from "../components/Typography";
import { apiService, toMapProduct } from "../service/service";
import { CSSObject } from "@emotion/css";
import { SetStateAction } from "react";

interface redeem {
  products: Product[];
  setToCart: React.Dispatch<SetStateAction<Product[]>>;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === "development") {
    return {
      props: {
        products: toMapProduct(mock),
      },
    };
  }
  console.log("PRODUCTION-REQ");
  const products = toMapProduct(await apiService("/products", "GET"));
  return {
    props: {
      products,
    },
  };
}
const style: CSSObject = {
  "&>section": {
    width: "100%",
    ...flex(),
    ...wrap(),
  },
};
const Reedem: React.FC<redeem> = ({ products, setToCart }) => {
  return (
    <View cssProps={style}>
      <Typography> {products.length}</Typography>
      <section>
        {products.map((product) => (
          <Card product={product} setToCart={setToCart} key={product.id} />
        ))}
      </section>
    </View>
  );
};
export default Reedem;
