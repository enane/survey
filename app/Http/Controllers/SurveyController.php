<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $survey  = Survey::where('user_id', $user->id)->get();

        return SurveyResource::collection($survey);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $newSurvey = Survey::create($request->all());

        $newSurvey->update(['user_id'=>Auth::user()->id]);
        foreach ($data['questions'] as $question) {
            SurveyQuestion::create([
                'survey_id'=>$newSurvey->id,
                'question'=>$question['question'],
                'description'=>$question['description']
            ]);
        }

        return new SurveyResource($newSurvey);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show(Survey $survey)
    {
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(Request $request, Survey $survey)
    {
        $survey->update($request->all());
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey)
    {
        $survey->delete();
        return response('survey deleted');
    }

    private function createQuestion($data)
    {
        return response($data['']);

        return SurveyQuestion::create($validator->validate());
    }

}
