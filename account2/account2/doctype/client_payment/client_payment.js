cur_frm.cscript.contact_no=function(doc,dct,cdn)
{
	frappe.call
	({
		method:"account2.account2.doctype.client_payment.client_payment.get_payment_info",
		args:{contact:doc.contact_no},
		callback:function(r)
		{
			var doclist=frappe.model.sync(r.message);
			cur_frm.set_value("customer_name",doclist[0].customer_name);
			cur_frm.set_value("hospital_name",doclist[0].hospital_name);
			cur_frm.set_value("paid_amount",doclist[0].pamount);
			cur_frm.set_value("remaining_amount",doclist[0].ramount);
		}
	});
}
cur_frm.cscript.payment_mode=function(doc,cdt,cdn)
{
	if(doc.payment_mode=='Cash')
	{
		cur_frm.toggle_enable('cheque_no', false);
	}
	else
	{
		cur_frm.toggle_enable('cheque_no', true);
	}
}
cur_frm.cscript.amount=function(doc,cdt,cdn)
{
	frappe.call
	({
		method:"account2.account2.doctype.client_payment.client_payment.get_payment_info",
		args:{contact:doc.contact_no},
		callback:function(r)
		{
			var doclist=frappe.model.sync(r.message);
			var pamount=doc.amount+doclist[0].pamount;
			var ramount=doclist[0].ramount-doc.amount;
			cur_frm.set_value("paid_amount",pamount);
			cur_frm.set_value("remaining_amount",ramount);
			if(doc.amount > doclist[0].ramount)
			{
				alert("Please Enter Proper Amount .Amount is greater than Remaining Amount");
				cur_frm.set_value("amount",'');
			}

		}
		
	});
	
}
