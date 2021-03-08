// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* 


Claim a product and add it to the user’s redeem history. 
Take into account that if your user doesn't have the required points, you won't be able to redeem the product. 
Inside the body request, the product Id is expected.

The body of this request has the following attributes:
Name 	Data Type 	Description
productId 	string, required 	Redeem a specific product
*/
import { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "../../service/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    "--------------------------reedem-API--------------------------------"
  );
  console.log(req.body, "body");
  if (req.method === "POST" && process.env.NODE_ENV === "development") {
    res.status(200).end();
  }
  if (req.method === "POST") {
    const { data }: { data: string[] } = req.body;
    await Promise.allSettled(
      data.map((id) =>
        apiService("/redeem", "POST", { data: id })
          .then((res) => res)
          .catch((err) => err)
      )
    );
  }
}
