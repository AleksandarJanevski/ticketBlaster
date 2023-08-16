const Purchase = require("./../../../pkg/ecommerce/paymentSchema");

exports.validate = async (req, res) => {
  try {
    const { fullName, cardNo, expire, pin } = req.body;
    if (typeof fullName !== "string") {
      return res.status(400).send("Please provide a valid name");
    }
    await Purchase.validate({
      fullName: fullName,
      cardNo: cardNo,
      expire: expire,
      pin: pin,
    });

    res.status(200).json({ status: "success", messsage: "Payment Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
