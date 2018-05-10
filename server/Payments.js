const stripe = require("stripe")("sk_test_LdNhOn0s563Qt83R14hhLyGQ");
const server = require("./server.js");
const BillingModel = require("./db/BillingModel.js");

// export function that takes server as an argument
module.exports = server => {
  // charge customer
  server.post("/api/payment", (req, res) => {
    // console.log("req.body", req.body);

    //passport function needed
    // console.log('req.user:', req.user);

    const token = req.body.postData.token.id;
    const selectedOption = req.body.postData.selectedOption;

    let planName = "";
    if (selectedOption === "Monthly") {
      planName = "plan_CpN6kHzPE3J5bX";
    } else if (selectedOption === "HalfYearly") {
      planName = "plan_CpOfKouHLBunzy";
    } else {
      planName = "plan_CpOf1aZKax6LSf";
    }

    // todo: don't create a customer if they are already in stripe
    // save all created customers and check against all purchases
    // pass in user email
    const customer = stripe.customers
      .create({
        email: "jd@gmail.com",
        source: token
      })
      .then(customer => {
        // console.log('customer:', customer);
        stripe.subscriptions.create(
          {
            customer: customer.id,
            items: [{ plan: planName }]
          },
          function(err, subscription) {
            // console.log('subscription log:', subscription);
            const newModelData = {
              userID: "myNewID2",
              subscriptionEndDate: subscription.current_period_end
            };
            // console.log('req.body', req.body);
            const newBilling = new BillingModel(newModelData);
            // console.log('newBilling', newBilling);
            newBilling.save();
          }
        );
      });
    res.send({ message: "Your card was charged" });
  });

  // based on userID check subscription end date and compare with today's date
  server.get("/api/make-decision/:soID", (req, res) => {
    console.log("req.params", req.params.soID);
    const soID = req.params.soID;
    BillingModel.findOne({ userID: soID }).then(endDate => {
      const newDate = new Date();
      const dateToday = Math.round(newDate.getTime() / 1000);
      const subEndDate = endDate.subscriptionEndDate;
      if (dateToday > subEndDate) {
        res.send("Your Subscription has ended. Click here to re-subscripe ");
      }
    });
  });
};
