<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use PhpParser\Node\Scalar\String_;

class Discipline extends Controller
{
    /**
     * Retrieves data about faculty members in a specific academic discipline
     *
     * @param  Request  $request  HTTP request containing the desired academic discipline
     */
    function getDiscipline(Request $request)
    {
        //----------------------------------------------------------------------------------------------API Link
        //       https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc&qf=abc&acad_spec=abc
        //------------------------------------------------------------------------------------------------------
        // Validate that the discipline parameter is present in the request
        $request->validate([
            'discipline' => 'required',
        ]);
        // Send an HTTP GET request to the API, passing the academic discipline as a parameter
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&acad_spec=".$request->input('discipline'));
        // Convert the response data from JSON to an associative array
        $decoded = $response->json();
        // Return the faculty data from the decoded JSON array
        return $decoded["ric_expert_portal_faculty_json_data"];
    }

}
