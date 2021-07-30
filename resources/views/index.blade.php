<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />

    </head>
    <body>
    <div id="app" class="container mx-auto py-4">
        <main-menu></main-menu>
        <router-view></router-view>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
