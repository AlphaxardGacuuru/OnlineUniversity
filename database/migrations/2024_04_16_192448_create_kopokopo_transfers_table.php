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
        Schema::create('kopokopo_transfers', function (Blueprint $table) {
            $table->id();
			$table->foreignId("user_id")->constrained();
            $table->string("kopokopoId")->nullable();
            $table->string("kopokopoCreatedAt")->nullable();
            $table->string("amount")->nullable();
            $table->string("currency")->nullable();
            $table->json("transferBatches")->nullable();
            $table->json("metadata")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kopokopo_transfers');
    }
};
