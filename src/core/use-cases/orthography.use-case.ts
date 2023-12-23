import { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (
  prompt: string
): Promise<OrthographyResponse> => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_URL_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!resp.ok) {
      throw new Error("No se pudo realizar la correccion de la ortografia");
    }
    const data = (await resp.json()) as OrthographyResponse;
    return {
      ok: true,
      userScore: data.userScore,
      errors: data.errors,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se pudo realizar la correccion de la ortografia",
    };
  }
};
