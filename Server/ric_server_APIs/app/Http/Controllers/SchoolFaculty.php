<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SchoolFaculty extends Controller
{
    function getSchoolFaculty(Request $request){

        //----------------------------------------------API Link------------------------------------------------
        // This is the API link for getting the school faculty data.
        // The placeholders in the link are as follows:
        // - auth: authentication token
        // - rows: number of rows to return
        // - empid: employee ID
        // - name: name of the faculty member
        // - qf: qualification
        // - acad_spec: academic speciality
        // - institute: institute name
        //------------------------------------------------------------------------------------------------------

        // Validate the request parameters
        $request->validate([
            'school' => 'required',
            'faculty' => 'required',
        ]);

//        https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10&empid=abc&name=abc&qf=abc&acad_spec=abc&institute=abc

        // Check if the request is for all the faculties in the school
        if($request->input("faculty") == "Faculty"){
            // If the request is for all the faculties, call the API with the school name as the parameter
            $response =
                Http::withoutVerifying()
                    ->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=1000&qf=Phd&&institute=".$request->input('school'));
        }
        else{
            // If the request is for a specific faculty, call the API with the faculty name and school name as parameters
            $response =
                Http::withoutVerifying()
                    ->get("https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty_cards&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=55&name=".$request->input('faculty')."&qf=Phd&&institute=".$request->input('school'));
        }

        // Decode the API response
        $decoded = $response->json();

        // Return the faculty data
        return $decoded["ric_expert_portal_faculty_cards_json_data"];
    }

}
