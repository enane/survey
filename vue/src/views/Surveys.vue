<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link class="px-2 py-2 text-white bg-gray-700 rounded-md" :to="{name: 'CreateSurvey'}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                              clip-rule="evenodd"/>
                    </svg>
                    New Survey
                </router-link>
            </div>
        </template>
        <div
            class="grid grid-cols-1 gap3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div v-for="survey in surveys"
                 :key="survey.id"
                 class="bg-white shadow-lg overflow-hidden sm:rounded-lg my-4 mx-6">
                <div class="flex justify-between items-center">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 v-html="survey.title" class="text-lg leading-6 font-medium text-gray-900"></h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Survey details</p>
                    </div>
                    <div class="flex">
                        <router-link :to="{name: 'ViewSurvey', params: { id: survey.id }}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 me-1" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </router-link>
                        <button
                            v-if="survey.id"
                            @click="deleteSurvey(survey)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <img :src="survey.image" class="w-full object-cover max-h-80">
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Survey Name</dt>
                            <dd v-html="survey.title" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                        </div>
                        <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">About</dt>
                            <dd v-html="survey.description" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Create Date:</dt>
                            <dd v-html="survey.created_at"
                                class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                        </div>
                        <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Expire Date:</dt>
                            <dd v-html="survey.expire_date" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import store from "../store";
import {computed} from "vue";

const surveys = computed(() => store.state.surveys);

function deleteSurvey(survey){
    if (confirm('Are you sure you want to delete this survey?')){

    }
}
</script>
