<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cafe;
use Inertia\Inertia;

class CafeController extends Controller
{
    public function index()
    {
        $allCafes = Cafe::latest()->get();

        return Inertia::render('CafeManagement/List', [
            'cafes' => $allCafes
        ]);
    }

    public function create()
    {
        return Inertia::render('CafeManagement/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required',
            'price_range' => 'required',
            'location' => 'required',
            'feedback' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
            'amenities' => 'nullable|array',
            'coffees' => 'nullable|array',
            'foods' => 'nullable|array',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cafes', 'public');
            $validated['image'] = $path;
        }

        $validated['amenities'] = $request->amenities ?? [];
        $validated['coffees'] = $request->coffees ?? [];
        $validated['foods'] = $request->foods ?? [];

        Cafe::create($validated);

        return redirect()->route('cafes.index');
    }

    public function edit(Cafe $cafe)
    {
        return Inertia::render('CafeManagement/Edit', [
            'cafe' => $cafe
        ]);
    }

    public function destroy(Cafe $cafe)
    {
        $cafe->delete();
        return redirect()->route('cafes.index');
    }
}