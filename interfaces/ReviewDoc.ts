import { ObjectId } from "mongodb";

export default interface ReviewDoc {
    name: string;
    user_id: string;
    date: Date;
    review: string;
    movie_id: ObjectId;
  }