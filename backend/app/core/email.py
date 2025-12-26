import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from app.core.config import settings


def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """
    Send an email using Gmail SMTP.
    Returns True if successful, False otherwise.
    """
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print("Warning: Email not configured. Skipping email send.")
        return False
    
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL or settings.SMTP_USER}>"
        msg["To"] = to_email
        
        html_part = MIMEText(html_content, "html")
        msg.attach(html_part)
        
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
        
        print(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False


def send_welcome_email(to_email: str, full_name: str) -> bool:
    """
    Send a welcome email to a newly registered user.
    """
    subject = "Welcome to Hotel Management System!"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
            .footer {{ text-align: center; margin-top: 20px; color: #888; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏨 Welcome to Our Hotel!</h1>
            </div>
            <div class="content">
                <h2>Hello {full_name}!</h2>
                <p>Thank you for creating an account with Hotel Management System. We're excited to have you on board!</p>
                <p>With your new account, you can:</p>
                <ul>
                    <li>Browse and book rooms at our hotels</li>
                    <li>Manage your reservations</li>
                    <li>Access exclusive member deals</li>
                </ul>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <a href="{settings.FRONTEND_URL}" class="button">Explore Hotels</a>
            </div>
            <div class="footer">
                <p>© 2024 Hotel Management System. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(to_email, subject, html_content)


def send_password_reset_email(to_email: str, full_name: str, reset_token: str) -> bool:
    """
    Send a password reset email with a secure link.
    """
    subject = "Reset Your Password - Hotel Management System"
    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
            .warning {{ background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin-top: 20px; }}
            .footer {{ text-align: center; margin-top: 20px; color: #888; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
                <h2>Hello {full_name}!</h2>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="{reset_link}" class="button">Reset Password</a>
                <div class="warning">
                    <strong>⚠️ Important:</strong>
                    <ul>
                        <li>This link will expire in {settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES} minutes</li>
                        <li>If you didn't request this, please ignore this email</li>
                        <li>Never share this link with anyone</li>
                    </ul>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="{reset_link}">{reset_link}</a>
                </p>
            </div>
            <div class="footer">
                <p>© 2024 Hotel Management System. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(to_email, subject, html_content)
