<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CafeController;


Route::get('/', function () {
    return Inertia::render('Welcome');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


require __DIR__ . '/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/cafes', [CafeController::class, 'index'])->name('cafes.index');
    Route::get('/cafes/create', [CafeController::class, 'create'])->name('cafes.create');
    Route::post('/cafes', [CafeController::class, 'store'])->name('cafes.store');

    Route::get('/cafes/{cafe}/edit', [CafeController::class, 'edit'])->name('cafes.edit');
    Route::put('/cafes/{cafe}', [CafeController::class, 'update'])->name('cafes.update');
    Route::delete('/cafes/{cafe}', [CafeController::class, 'destroy'])->name('cafes.destroy');
});