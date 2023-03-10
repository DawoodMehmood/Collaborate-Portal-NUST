<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailSender extends Controller
{
    public function sendEmail(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'subject'=>'required',
            'message'=>'required',
//            'file'=>'nullable|max:25600',
        ]);

        $name = $request->input('name');
        $email = $request->input('email');
        $subject = $request->input('subject');
        $message = $request->input('message');

        $to = 'haseebabdul148@gmail.com';
        $from = $email;
        $headers = 'From: ' . $from . "\r\n" .
                    'Reply-To: ' . $email . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();


        $body = "Name: " . $name . "\r\n" .
                "Message: " . $message . "\r\n";
        if (mail($to, $subject, $body, $headers)) {
            return response()->json(['message' => 'Email sent successfully.']);
        } else {
            return response()->json(['message' => 'Email sending failed.']);
        }
    }
}
