<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use \Illuminate\Http\Request;

class QuoteResource extends JsonResource
{
    /**
     * @param Request $request
     */
    public function toArray($request): string
    {
        return $this->quote;
    }
}
