<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\NewAccessToken;

class Login
{
    /**
     * @param null  $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args): array
    {
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        if( !$guard->attempt($args)) {
            throw new Error('Invalid credentials.');
        }

        /** @var User $user */
        $user = $guard->user();
        /** @var NewAccessToken $token */
        $token = $user->createToken('graphql-admin');

        return [
            'token' => $token->plainTextToken,
            'token_type' => 'Bearer'
        ];
    }
}
