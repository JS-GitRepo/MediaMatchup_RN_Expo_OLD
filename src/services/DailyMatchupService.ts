import axios from "axios";
import DailyMatchupCollection from "../models/DailyMatchupCollection";

const baseURL: string = `${process.env.REACT_APP_API_URL}/dailymatchups` || "";

export const getDailyMatchupCollection = async (
  simpleDate: number
): Promise<DailyMatchupCollection> => {
  return (await axios.get(baseURL, { params: { date: simpleDate } })).data;
};

export const postDailyMatchupCollection = async (
  dailyCollection: DailyMatchupCollection
): Promise<DailyMatchupCollection> => {
  return (await axios.post(baseURL, dailyCollection)).data;
};
