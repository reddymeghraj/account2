# Copyright (c) 2013, wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ClientPayment(Document):
	def on_submit(self):
		q=frappe.db.sql("""select invoice_no,paid_amount,remaining_amount from `tabDirect Sale` where mobile=%s and remaining_amount > 0""",(self.contact_no),as_dict=1)
		length=len(q)
		amt=self.amount
		for i in range(length):
			if amt<q[i].remaining_amount:
				ramt=q[i].remaining_amount-amt
				q1=frappe.db.sql("""update `tabDirect Sale` set paid_amount=paid_amount+%s,remaining_amount=%s where invoice_no=%s""",(amt,ramt,q[i].invoice_no))
				break
			else:
				amt=amt-q[i].remaining_amount
				q1=frappe.db.sql("""update `tabDirect Sale` set paid_amount=paid_amount+%s,remaining_amount=0 where invoice_no=%s""",(q[i].remaining_amount,q[i].invoice_no))
				if amt==0:
					break	
@frappe.whitelist()
def get_payment_info(contact):
	q=frappe.db.sql("""select customer_name,hospital_name,sum(paid_amount)as pamount,sum(remaining_amount)as ramount from `tabDirect Sale` where mobile=%s""",(contact),as_dict=1)
	if q:
		return q
	else:
		return ''
		