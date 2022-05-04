import { ObjectId } from "mongodb";

const getNewId = () : string => {
    let o = (new ObjectId());

    return o.toString();
}

export default getNewId;