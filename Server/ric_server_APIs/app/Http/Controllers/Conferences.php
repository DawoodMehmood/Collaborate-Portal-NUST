<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

// Defining Conferences class which extends Controller class
class Conferences extends Controller
{
    // Defining static function getConferences that takes $ID as parameter
    static function getConferences($ID){
        //--------------------------------------API Link--------------------------------------------------------
        //       https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_conference_pub&auth=2959527935aea37f3fa445143c8303ba&rows=10&title=abc&author_name=abc&author_cmsid=abc
        //------------------------------------------------------------------------------------------------------

        // Http request to get data from the API
        $response = Http::withoutVerifying()->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_conference_pub&auth=2959527935aea37f3fa445143c8303ba&rows=250&author_cmsid=".$ID);

        // Returning the desired data from the json response
        return $response->json()["ric_expert_portal_conference_pub_json_data"];
    }

}
