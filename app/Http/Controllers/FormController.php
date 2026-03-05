<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function submit(Request $request)
    {
        return view('results', [
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'age' => $request->input('age'),
            'place_of_birth' => $request->input('place_of_birth'),
        ]);
    }

}
