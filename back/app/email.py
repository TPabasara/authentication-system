import smtplib
from email.message import EmailMessage
from app.routers.database.config import EMAIL, EMAIL_PASS

def send_otp_email(otp, exist_email):
    msg = EmailMessage()
    msg["subject"] = "Reset Password"
    msg["from"] = "ecommerceproject49253@gmail.com"
    msg["to"] = exist_email
    msg.set_content(f"""
Hi,

We received a request to reset your password. Use the following to confirm this is actually you:

🔐 OTP:{otp}

If you did not request this, please ignore this email.

Regards,  
Your Website Team
""")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL, EMAIL_PASS)
        smtp.send_message(msg)