<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Character;

class CharacterSeeder extends Seeder
{
    public function run()
    {
        Character::factory(10)->hasQuotes(3)->create();
    }
}
