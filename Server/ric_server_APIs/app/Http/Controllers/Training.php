<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Training extends Controller
{
    /**
     * Retrieve trainings from the API based on author's ID
     *
     * @param string $ID The author's CMS ID
     * @return mixed The decoded JSON data returned by the API
     */
    static function getTrainings(string $ID): mixed
    {
        //----------------------------------------------------------------------------------------------API Link
        // The URL to the API, along with the required parameters. The auth parameter is used for authentication.
        // The author_cmsid parameter is used to retrieve trainings by the author's ID.
        // The rows parameter limits the number of results returned by the API.
        // The title and author_name parameters are optional, and can be used to filter the results.
        // https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_training&auth=3a4c649fa4ad67c31e815bc39c1ce5d3&rows=10&title=abc&author_name=abc&author_cmsid=abc
        //------------------------------------------------------------------------------------------------------
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_training&auth=3a4c649fa4ad67c31e815bc39c1ce5d3&author_cmsid=".$ID);
        // Decode the JSON data returned by the API
        $decoded = $response->json();
        // Return the decoded JSON data
        return $decoded["ric_expert_portal_training_json_data"];
    }


}
