const LiqPay = require('liqpay')

class PaymentService {
   constructor() {
      this.liqPay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY)
   }

   async generateHtmlForm(params) {
      return await this.liqPay.cnb_form(params)
   }
}

module.exports = new PaymentService()
