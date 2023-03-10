<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class IP extends Controller
{
    /**
     * Fetches intellectual property data from an external API based on inventor CMS ID.
     *
     * @param string $ID The inventor CMS ID.
     * @return array The array of intellectual property data.
     */
    static function getIP(string $ID): array
    {
        //----------------------------------API Link------------------------------------------------------------
        // The link to the external API that will be used to fetch the intellectual property data.
        // It includes an alias, authentication token, and parameters for the rows to fetch and the inventor CMS ID.
        // Example link: https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10&title=abc&initiator_cmsid=abc&initiator_name=abc&inventor_cmsid=abc&inventor_name=abc
        //------------------------------------------------------------------------------------------------------
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=250&inventor_cmsid=".$ID);
        // Decode the JSON response from the API into an associative array.
        $decoded = $response->json();
        // Return the array of intellectual property data.
        return $decoded["ric_expert_portal_intellectual_json_data"];
    }
    /**
     * Get intellectual property data from API by title
     *
     * @param Request $request The HTTP request object
     *
     * @return array The decoded JSON response from the API
     */
    function getIPByTitle(Request $request): array
    {
        //----------------------------------------------------------------------------------------------API Link
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10&title=abc&initiator_cmsid=abc&initiator_name=abc&inventor_cmsid=abc&inventor_name=abc
        //------------------------------------------------------------------------------------------------------

        // Validate that the "title" parameter is present in the request
        $request->validate([
            'title' => 'required',
        ]);

        // Get the value of the "title" parameter from the request
        $Title = $request->input('title');

        // Query the API for intellectual property data using the "title" parameter
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=250&title=".$Title);

        // Decode the JSON response from the API into an associative array
        $decoded = $response->json();

        // Return the "ric_expert_portal_intellectual_json_data" key from the decoded response
        return $decoded["ric_expert_portal_intellectual_json_data"];
    }

}
