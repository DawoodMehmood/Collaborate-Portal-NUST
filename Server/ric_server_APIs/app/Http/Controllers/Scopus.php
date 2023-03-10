<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Scopus extends Controller
{
//
    /**
     * Retrieves the author(s) of a publication based on the DOI.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    function getAuthor(Request $request)
    {
        // Validate the DOI parameter.
        $request->validate([
            'DOI'=>'required',
        ]);

        // Retrieve the DOI parameter from the request.
        $DOI = $request->input('DOI');

        // Send a GET request to the Scopus API to retrieve the JSON data of the publication based on the DOI.
        $response = Http::withHeaders(["Accept"=>"application/json", "X-ELS-APIKey"=>"e96b5971e4abb250354bc895de973b09"])
            ->get("https://api.elsevier.com/content/search/scopus?query=DOI(".$DOI.")");

        // Extract the URL of the publication from the JSON data returned by the Scopus API.
        $JsonData = $response->json();
        $JsonData = $JsonData["search-results"]["entry"][0]["link"][0]["@href"];

        // Send a GET request to the Elsevier API to retrieve the author(s) of the publication based on the URL extracted earlier.
        $Authors = Http::withHeaders([
            "Accept"=>"application/json",
            "X-ELS-APIKey"=>"e96b5971e4abb250354bc895de973b09"
        ])->get($JsonData);

        // Return the JSON data of the author(s).
        return $Authors->json();
    }


}
