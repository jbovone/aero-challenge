import axios from "axios";

const API_BASE = "https://coding-challenge-api.aerolab.co";

export async function apiService(
  endpoint: string,
  method: "POST" | "GET",
  body?: any
): Promise<any> {
  return axios({
    method: method,
    baseURL: API_BASE,
    url: endpoint,
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    data: {
      ...body,
    },
  })
    .then((res) => res.data)
    .catch((err) => err);
}

export function toMapProduct(raw: any): Product[] {
  return raw.map(({ _id, ...product }: { _id: string }) => ({
    ...product,
    id: _id,
  }));
}
