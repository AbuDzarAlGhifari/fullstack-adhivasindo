<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('modul_id')
                ->constrained('moduls')->cascadeOnDelete();
            $table->string('name');
            $table->string('cover_image')->nullable();
            $table->longText('description')->nullable();
            $table->string('resource_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
