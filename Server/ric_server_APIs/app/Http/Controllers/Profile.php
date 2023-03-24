<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Profile extends Controller
{
    /**
     * Get profile information for a given name.
     *
     * @param Request $request The HTTP request object.
     * @return array The decoded JSON data returned by the API.
     */
    function getProfile(Request $request): array
    {
        //----------------------------------API Link------------------------------------------------------------
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc&qf=abc&acad_spec=abc&institute=abc
        //------------------------------------------------------------------------------------------------------

        // Validate that the 'name' parameter is present in the request.
        $request->validate([
            'name' => 'required',
        ]);

        // Get the value of the 'name' parameter from the request.
        $Name = $request->input('name');

        // Call the API to get the profile information.
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=1000&name=".$Name);

        // Decode the JSON data returned by the API.
        $decoded = $response->json();

        // Return the decoded JSON data.
        return $decoded["ric_expert_portal_faculty_cards_json_data"];;
    }
    /**
     * Get faculty profile from employee ID
     *
     */
    static function getProfileFromID(string $ID): array
    {
        //----------------------------------API Link------------------------------------------------------------
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc
        //------------------------------------------------------------------------------------------------------

        // Send request to the API endpoint to get the faculty profile information
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=100&empid=".$ID);

        // Decode the response JSON
        $decoded = $response->json();

        // Return the array of faculty profile information
        return $decoded["ric_expert_portal_faculty_json_data"];;
    }

}
