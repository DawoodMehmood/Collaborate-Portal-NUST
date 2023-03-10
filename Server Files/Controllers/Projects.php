<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Projects extends Controller
{
    /**
     * Retrieve projects by ID from the API
     *
     * @param string $ID The CMS ID of the project initiator or co-PI
     * @return array The JSON data for the projects
     */
    static function getProjects(string $ID): array
    {
        // API endpoint for project retrieval
        $apiEndpoint = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=200&pi_copi_cmsid=".$ID;

        // Send HTTP GET request to API endpoint to retrieve data
        $response = Http::withoutVerifying()->get($apiEndpoint);

        // Return the decoded JSON data for the projects
        return $response->json()["ric_expert_portal_project_json_data"];
    }
    /**
     * Get project information by title.
     *
     * @param  Request  $request  The HTTP request object containing the 'title' parameter.
     * @return array    The project information retrieved from the API.
     */
    function getProjectByTitle(Request $request): array
    {
        //----------------------------------------------------------------------------------------------API Link
        //        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=10&pi_copi_cmsid=abc&pi-copi_name=abc&title=abc
        //------------------------------------------------------------------------------------------------------
        // Validate the request parameter.
        $request->validate([
            'title' => 'required',
        ]);

        // Get the 'title' parameter value from the request.
        $Title = $request->input('title');

        // Call the API to get project information based on the title parameter.
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=100&title=".$Title);

        // Decode the API response.
        $decoded = $response->json();

        // Return the project information retrieved from the API.
        return $decoded["ric_expert_portal_project_json_data"];;
    }

}
