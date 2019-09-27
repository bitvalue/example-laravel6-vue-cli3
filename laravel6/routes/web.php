<?php

Route::view('/{any?}', 'app')->where('any', '^(?!api).*$');
