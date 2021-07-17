<?php

use App\Models\Character;
use App\Models\Quote;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a character with quotes', function () {
    $character = Character::factory()->hasQuotes(1)->create();

    $fullname = sprintf('%s %s', $character->firstname, $character->lastname);
    $quote = $character->quotes()->first();

    $this->assertTrue($character instanceof Character);
    $this->assertTrue($quote instanceof Quote);
    $this->assertTrue($character->fullname() === $fullname);
});
