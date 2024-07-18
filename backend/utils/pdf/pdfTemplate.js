import moment from 'moment'

function addCurrencyCommas(currency) {
	if (currency) {
		return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
}

export default function ({ user, doc, status, totalAmountReceived }) {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<style>

  body{
    font-family: Arial, Helvetica, sans-serif;
    max-width: 1200px;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    margin: auto;
    padding: 20px;
    border-radius: 10px;
  }
  .container{
    margin: 0 auto;
    padding-top: 10px;
  }
  .heading{
    height: 50px;
    letter-spacing: 2px;
  }
  .row {
    width: 100%;
    display: flex;
    height: fit-content;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .left{
    float: left;
    width: 40%;
  }
  .right{
    float: right;
    width: 40%;
  }
  .header{
    font-weight: 100;
    text-transform: uppercase;
    color: #555;
    letter-spacing: 1px;
    font-size: 10px;
    line-height: 5px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    font-family: Arial, Helvetica, sans-serif;
  }
  th, td {
    text-align: left;
    padding: 16px;
  }
  tr:nth-child(even){
    background-color: #f2f2f2;
  }
  .summary {
    margin: 20px 0 15px 50%;
  }
</style>
</head>
<body>
  <div class="container">
    <section class="row" style="height: 70px; border-bottom: 1px solid #ebebeb;">
      <div class="left">
        <span style="margin: 0; font-size: 14px;">
        ${doc?.documentType}#:
        <b style="color:#5a5a5a;"> ${doc?.documentNumber}</b>
        </span>
      
      </div>

      <div class="right">
        <h3 style="font-size: 12px; text-transform: uppercase;"> <strong>From: </strong></h3>
        <p style="font-size: 12px;">${user?.userProfile?.email}</p>
       
      </div>
    </section>
    
    <section class="row" style="height: 100px;">
      <div class="left">
        <h3 style="font-size: 12px; text-transform: uppercase;"> <strong>Bill to: </strong></h3>
        <p style="font-size: 10px"> <span class="header">Name: </span>${
									doc?.customer?.name
								}</p>
        <p style="font-size: 10px"> <span class="header">No: </span>${
									doc?.customer?.accountNo
								}</p>
        <p style="font-size: 10px"> <span class="header">ABN:</span>${
									doc?.customer?.abn || ''
								}</p>
        <p style="font-size: 10px"> <span class="header">Email: </span>${
									doc?.customer?.email
								}</p>
        
      </div>

      <div class="right">
        <h3 style="font-size: 12px; text-transform: uppercase;"> <strong>Payment Status: </strong></h3>

        <p style="font-size: 10px;"> <span class="header">Status: </span>${status}</p>
        <p style="font-size: 10px;"> <span class="header">Issued: </span>${moment(
									doc?.createdAt
								).format('DD-MM-YYYY')}</p>
        <p style="font-size: 10px;"> <span class="header">Due: </span>${moment(
									doc?.dueDate
								).format('DD-MM-YYYY')}</p>
        <p style="font-size: 10px;"><span class="header">Total Amount:</span> 
        <span style="font-size: 10px">
          <span>${doc?.currency}</span>
          <span>${addCurrencyCommas(doc?.total?.toFixed(2))}</span>
          </span>
        </p>
      </div>
    </section>

   
    <table style="margin-top: 25px;">
      <tr style="background-color: black; color:white">
        <th style="font-size: 10px">#</th>
        <th style="font-size: 10px">Product/Service</th>
        <th style="font-size: 10px">Qty</th>
        <th style="font-size: 10px">Unit Price/Rate</th>
        <th style="font-size: 10px">Line Total</th>
      </tr>
      ${doc?.billingItems?.map(
							(item, index) =>
								`<tr>
        <td style="font-size: 10px">${index + 1}</td>
        <td style="font-size: 10px">${item.itemName}</td>
        <td style="font-size: 10px">${item.quantity}</td>
        <td style="font-size: 10px">${item.unitPrice}</td>
        <td style="font-size: 10px">${(
									item?.quantity * item.unitPrice -
									(item.quantity * item.unitPrice * item.discount) / 100
								)?.toFixed(2)}</td>
       </tr>`
						)}
   
    </table>
    <section class="summary">
          <table>
            <tr style="background-color: black; color:white">
              <th style="font-size: 10px; text-align:center">Cost Summary</th>
              <th></th>
            </tr>
            <tr>
              <td style="font-size: 10px">Sub Total:</td>
              <td style="text-align: right; font-size: 10px; font-weight: 700">
                ${addCurrencyCommas(doc?.subTotal.toFixed(2))}
                </td>
            </tr>
            <tr>
              <td style="font-size: 10px">Tax (${doc?.rates}%):</td>
              <td style="text-align: right; font-size: 10px; font-weight: 700">
                ${doc?.salesTax?.toFixed(1)}
                </td>
            </tr>
             <tr>
              <td style="font-size: 10px">Total:</td>
              <td style="text-align: right; font-size: 10px; font-weight: 700">
                ${addCurrencyCommas(doc?.total?.toFixed(2))}
                </td>
            </tr>
           
            <tr>
              <td style="font-size: 10px">Balance:</td>
              <td style="text-align: right; font-size: 10px; font-weight: 700">${
															doc?.currency
														}
                ${addCurrencyCommas(
																	Math.round(doc?.total - totalAmountReceived)?.toFixed(2)
																)}
                </td>
            </tr>
          </table>
   
    </section>
    <hr class="divider">
    <section class="row">
      <div class="two-column">
        <h4 style="font-size: 10px">Additional Info</h4>
        <hr class="divider">
        <p style="font-size: 10px">${doc?.additionalInfo}</p>
      </div>
      <div class="two-column">
        <h4 style="font-size: 10px">Terms & Conditions</h4>
        <hr class="divider">
        <p style="font-size: 10px">${doc?.termsConditions}</p>
      </div>
    </section>
  </div>
</body>

</html>
	
	`
}
