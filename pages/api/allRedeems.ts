import { NextApiRequest, NextApiResponse } from "next";
import products from "../../mockData.json";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(
    products,
    "--------------------------PRODUCTS-API--------------------------------"
  );
  res.status(200).json(products);
};
