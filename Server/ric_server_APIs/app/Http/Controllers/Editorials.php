<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Editorials extends Controller
{
    /**
     * Get editorials by author name
     *
     * @param string $Name  Author name
     * @return array   Editorial data
     */
    static function getEditorials(string $Name): array
    {
        //----------------------------------------------------------------------------------------------API Link
        //       https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=a52e3b5eeab7ce74317b1634706b4930&rows=10&title=abc&author_name=abc
        //------------------------------------------------------------------------------------------------------
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=a52e3b5eeab7ce74317b1634706b4930&rows=500&author_name=".$Name);

        $decoded = $response->json();
        return $decoded["ric_expert_portal_editorial_json_data"];
    }

}
