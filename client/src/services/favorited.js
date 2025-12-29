import Client from "./api"

export const GetFavorites = async () => {
  try {
    const res = await Client.get("/favorited")
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddFavorite = async (movieId) => {
  try {
    const res = await Client.post("/favorited", { movie: movieId })
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteFavorite = async (id) => {
  try {
    const res = await Client.delete(`/favorited/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}