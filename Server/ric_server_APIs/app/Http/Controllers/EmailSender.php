<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailSender extends Controller
{
    /**
     * Send email using PHPMailer library
     *
     * @param Request $request The HTTP request containing form data
     *
     * @return array An associative array with status, subject, and message keys
     * @throws Exception
     */
    public function sendEmail(Request $request): array
    {
        // Validate form data
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'subject' => 'required',
                'message' => 'required',
//                'file' => 'nullable'
            ]);
            // Get form data
            $name = $request->input("name");
            $email = $request->input("email");
            $subject = $request->input("subject");
            $message = $request->input("message");

            // Create a new instance of PHPMailer class
            $mail = new PHPMailer(true);

            //Set mailer to use SMTP
            $mail->isSMTP();
            //Outlook SMTP configuration
            $mail->Host       = 'smtp.office365.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'collaborate@nust.edu.pk';
            $mail->Password   = 'Bux95905';
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            //Set sender and recipient
            $mail->setFrom('collaborate@nust.edu.pk', $name." (Collaboration Portal) ");
            $mail->addAddress('collaborate@nust.edu.pk');
            $mail->addReplyTo($email, $name);

            //Set email content
            $mail->isHTML();
            $mail->Subject = "$subject";
            $mail->Body    = "<p>$message</p>";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            //Send the email
            try {
                $mail->send();
                return ['Status'=>'OK'];
            } catch (Exception $e) {
                return ['Status'=>'Error'];
            }
        }
}
