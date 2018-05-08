const stripe = require("stripe")("sk_test_LdNhOn0s563Qt83R14hhLyGQ");
const server = require('./server.js');

// export function that takes server as an argument
module.exports = (server) => {

// subscription
server.post('/billing', (req, res) => {
    // console.log("req.body", req.body);
    const token = req.body.postData.token.id;
    const selectedOption = req.body.postData.selectedOption;

        let planName = '';
        if (selectedOption === 'HalfYearly') {
            planName = 'plan_CozyY4xQ3pWrEv'
        } else if (selectedOption === 'Monthly') {
            planName = 'plan_Cozz1r5X1P8rg4';
        } else {
            planName = 'plan_CozqA9QjBjaSBp';
        };
 
    const customer = stripe.customers.create({
        email: 'jd@gmail.com',
        source: token,
        }).then(customer => {
        // console.log('customer:', customer);
            stripe.subscriptions.create({
                customer: customer.id,
                items: [{plan: planName}],
            }, function(err, subscription) {
              console.log('subscription log:', subscription);
            });
        });
    });

}
  




