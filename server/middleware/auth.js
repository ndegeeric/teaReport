import jwt  from "jsonwebtoken";

const secret = process.env.SECRET;

const auth = async(req,res,next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1] || req.headers.Authorization.split(" ")[1];

        if(!token) return res.status(401).send(`You are Not Authorized`);

        let decodedData = jwt.verify(token, secret);

        req.userId = decodedData.id;

        next();
    } catch (error) {
        res.status(401).send(`Your Token has Expired Token`);
    }
}

export default auth; 