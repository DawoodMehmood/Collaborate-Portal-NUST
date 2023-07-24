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
        //       https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=e09d3d4b09c4e553fcb1901d4b555acf&rows=10&title=abc&author_name=abc
        //------------------------------------------------------------------------------------------------------
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=e09d3d4b09c4e553fcb1901d4b555acf&rows=500&author_name=".$Name);

        $decoded = $response->json();
        return $decoded["ric_expert_portal_editorial_json_data"];
    }

}
