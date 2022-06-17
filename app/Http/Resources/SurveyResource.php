<?php

namespace App\Http\Resources;

use App\Models\SurveyQuestion;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $questions = SurveyQuestion::where('survey_id', $this->id)->get();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'status' => !!$this->status,
            'description' => $this->description,
            'created_at' => (new \DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime($this->updated_at))->format('Y-m-d H:i:s'),
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d'),
            'questions' => count($questions) > 0 ? SurveyQuestion::where('survey_id', $this->id)->get() : []
        ];
    }
}
