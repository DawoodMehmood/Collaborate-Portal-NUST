<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Publications extends Controller
{
    /**
     * Get the publications of a faculty member by ID
     *
     * @param string $ID The ID of the faculty member
     * @return mixed The publications data in JSON format
     */
    static function getPublications(string $ID): mixed
    {
        //----------------------------------API Link------------------------------------------------------------
        // The API endpoint URL for getting publications data
        // It takes the following query parameters:
        // - alias: the alias of the API endpoint
        // - auth: the authentication token for the API
        // - rows: the number of rows to return
        // - author_cmsid: the CMS ID of the author
        // - author_name: the name of the author
        // - title: the title of the publication
        //------------------------------------------------------------------------------------------------------
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=1000&author_cmsid=".$ID);

        // Return the JSON data for publications
        return $response->json()["ric_expert_portal_journal_pub_json_data"];
    }
    static function getPublicationsbyschool(string $name): mixed
    {
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub_author_cms&auth=fc22151322bfdd2c3f0626798c9198cd&rows=10000&institute=".$name);

        // Return the JSON data for publications
        return $response->json()["ric_expert_portal_journal_pub_author_cms_json_data"];
    }
    static function getPublicationsbyoutside(string $name): mixed
    {
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub_author_cms&auth=fc22151322bfdd2c3f0626798c9198cd&rows=10000&outsideinstitute=".$name);

        // Return the JSON data for publications
        return $response->json()['ric_expert_portal_journal_pub_author_cms_json_data'];
    }

    /**
     * Get publications by title from API
     * @param Request $request - HTTP request object containing the title parameter
     * @return mixed - JSON data from API
     */
    function getPublicationsByTitle(Request $request): mixed
    {
        //----------------------------------------------------------------------------------------------API Link
        // https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=10&author_cmsid=abc&author_name=abc&title=abc&affiliation=abc&institute=abc
        //------------------------------------------------------------------------------------------------------

        // Validate the request input
        $request->validate([
            'title' => 'required',
        ]);

        // Get the title parameter from the request
        $Title = $request->input('title');

        // Make an HTTP GET request to the API
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=1000&title=".$Title);

        // Decode the JSON response
        $decoded = $response->json();

        // Return the data from the "ric_expert_portal_journal_pub_json_data" field
        return $decoded["ric_expert_portal_journal_pub_json_data"];
    }

    static function getPublicationsbysdg(string $name): mixed
    {
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub_author_cms&auth=fc22151322bfdd2c3f0626798c9198cd&rows=10000&sdg=".$name);
        // Return the JSON data for publications
        return $response->json()["ric_expert_portal_journal_pub_author_cms_json_data"];
    }
}
