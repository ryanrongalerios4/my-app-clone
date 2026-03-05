<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validate the input (Make sure it's an email and password isn't empty)
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Attempt to log the user in
        // Laravel automatically hashes the password and checks it against the database
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); // Security best practice

            return redirect()->intended('dashboard'); // Send them to the dashboard
        }

        // 3. If it fails, send them back with an error message
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}