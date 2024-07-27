<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_billables', function (Blueprint $table) {
            $table->id();
            $table->foreignId("invoice_id")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId("billable_id")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();

            $table->unique(["invoice_id", "billable_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice_billables');
    }
};
