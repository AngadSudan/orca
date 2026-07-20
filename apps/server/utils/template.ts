export const SEND_VERIFICATION_MAIL = ({
  email,
  name,
  otp,
}: {
  email: string;
  name: string;
  otp: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;">
          <tr>
            <td>
              <h2 style="margin-top:0;color:#333;">Hello ${name},</h2>

              <p style="color:#555;font-size:16px;line-height:1.6;">
                Thanks for signing up! Use the following One-Time Password (OTP) to verify your email address.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <span style="
                  display:inline-block;
                  padding:15px 30px;
                  font-size:28px;
                  font-weight:bold;
                  letter-spacing:6px;
                  background:#f5f5f5;
                  border-radius:6px;
                  color:#222;
                ">
                  ${otp}
                </span>
              </div>

              <p style="color:#555;font-size:15px;">
                This OTP is linked to: <strong>${email}</strong>
              </p>

              <p style="color:#555;font-size:15px;">
                If you didn't request this code, you can safely ignore this email.
              </p>

              <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />

              <p style="font-size:13px;color:#888;">
                This OTP will expire shortly for your security.
              </p>

              <p style="color:#333;">
                Thanks,<br />
                <strong>Your Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
