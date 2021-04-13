import { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "../../service/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    "--------------------------reedem-API--------------------------------"
  );
  if (req.method === "POST") {
    const { data }: { data: string[] } = req.body;
    await Promise.allSettled(
      data.map((id) =>
        apiService("/redeem", "POST", { productId: id })
          .then(() => res.status(200).end())
          .catch(() => res.status(400).end())
      )
    );
  }
}
