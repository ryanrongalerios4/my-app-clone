<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cafes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable();
            $table->string('price_range')->nullable();
            $table->string('location')->nullable();
            $table->text('feedback')->nullable();
            $table->string('image')->nullable();
            $table->json('amenities')->nullable();
            $table->json('coffees')->nullable();
            $table->json('foods')->nullable();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cafes');
    }
};
