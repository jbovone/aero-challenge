import axios from "axios";
import Box from "../components/Box";
import Card from "../components/Card";
import View from "../components/View";
import { flex, wrap } from "../utils/flex";
import mock from "../mockData.json";

interface redeem {
  products: Card[];
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === "development") {
    return {
      props: {
        products: mock,
      },
    };
  }
  const products = await axios
    .get("/allRedeems", {
      headers: {},
    })
    .then((res) => res.data)
    .catch((err) => err);

  return {
    props: {
      products,
    },
  };
}
const style: any = {
  ...flex(),
  ...wrap(),
};
const Reedem: React.FC<redeem> = ({ products }) => {
  return (
    <View cssProps={style}>
      {products.map((product) => (
        <Card {...product} key={product.id} />
      ))}
    </View>
  );
};
export default Reedem;
