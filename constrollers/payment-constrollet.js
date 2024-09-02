const db = require("../models/db");

exports.payment = async (req, res, next) => {
    try{
        const { date, userId, status, all_price,orderId ,locationId } =req.body
        console.log("dfsf112211",date, userId, status, all_price)

        const payment = await db.payment.create({
            data: {
                date: new Date(date),
                user: {
                    connect: {
                        id: userId
                    }
                },
                status: status,
                all_price: all_price,
                order: {
                    connect: {
                        id: orderId
                    }
                },
                location: {
                    connect: {
                        id: locationId
                    }
                }
            }
        })
        res.json({ message: "Payment successful", payment })
    }catch(err){
        next(err)
    }
}
exports.getpayment = async (req, res, next) => {
    try{
        const payment = await db.payment.findMany({
            include: {
                user: true,
                order: true,
                location: true
            }
        })
        res.json({ payment })
    }catch(err){
        next(err)
    }
};
