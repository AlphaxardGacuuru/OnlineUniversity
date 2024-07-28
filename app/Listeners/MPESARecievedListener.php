<?php

namespace App\Listeners;

use App\Events\MPESARecievedEvent;
use App\Http\Services\InvoiceService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MPESARecievedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\MPESARecievedEvent  $event
     * @return void
     */
    public function handle(MPESARecievedEvent $event)
    {
		$invoiceService = new InvoiceService;
        $invoiceService->updateInvoice($event->user->id);
    }
}
