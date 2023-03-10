<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Supervisiors extends Controller
{
    /**
     * Fetches data related to RTTM.
     *
     * @return mixed
     */
    function getRTTM(): mixed
    {
        //----------------------------------------------------------------------------------------------API Link
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&student_name=abc&student_id=abc
        //------------------------------------------------------------------------------------------------------

        // Makes a GET request to the given API link to retrieve data.
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10");

        // Decodes the JSON response into an associative array.
        $decoded = $response->json();

        // Returns the data related to RTTM.
        return $decoded["ric_expert_portal_rttm_json_data"];
    }

    /**
     * Fetches data related to supervisors.
     *
     * @param $ID
     * @return mixed
     */
    static function getSuperVisors($ID): mixed
    {
        //----------------------------------------------------------------------------------------------API Link
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&supervisor_id=abc&supervisoer_name=abc
        //------------------------------------------------------------------------------------------------------

        // Makes a GET request to the given API link to retrieve data.
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=100&supervisor_id=".$ID);

        // Decodes the JSON response into an associative array.
        $decoded = $response->json();

        // Returns the data related to supervisors.
        return $decoded["ric_expert_portal_rttm_json_data"];;
    }


}
